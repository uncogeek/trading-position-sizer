<?php
// Set headers to allow CORS and specify content type
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Your API key - consider storing this in a more secure way in production
$api_key = "YOUR-API-KEY"; // replace your api key here

// Cache settings (optional)
$cache_file = 'exchange_rates_cache.json';
$cache_time = 3600; // Cache lifetime in seconds (1 hour)

// Function to get fresh data from the API
function fetchFreshData($api_key) {
    $api_url = "https://v6.exchangerate-api.com/v6/{$api_key}/latest/USD";
    
    // Initialize cURL session
    $ch = curl_init($api_url);
    
    // Set cURL options
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    
    // Execute cURL session and get the response
    $response = curl_exec($ch);
    
    // Check for errors
    if (curl_errno($ch)) {
        $error = curl_error($ch);
        curl_close($ch);
        return [
            'success' => false,
            'error' => "cURL Error: $error",
            'timestamp' => time()
        ];
    }
    
    // Close cURL session
    curl_close($ch);
    
    // Decode the JSON response
    $data = json_decode($response, true);
    
    // Add cryptocurrency prices (since they're not in the standard exchange rate API)
    // You can update these manually or integrate with a crypto API
    if ($data && $data['result'] === 'success') {
        $data['conversion_rates']['BTC'] = 68500; // Example fixed value - update as needed
        $data['conversion_rates']['ETH'] = 3250.5; // Example fixed value for Ethereum
    }
    
    // Add timestamp for cache management
    $data['timestamp'] = time();
    
    return $data;
}

// Check if we should use cached data
$use_cache = false;
if (file_exists($cache_file)) {
    $cache_data = json_decode(file_get_contents($cache_file), true);
    if ($cache_data && isset($cache_data['timestamp']) && (time() - $cache_data['timestamp'] < $cache_time)) {
        $use_cache = true;
        $data = $cache_data;
    }
}

// Fetch fresh data if cache is expired or doesn't exist
if (!$use_cache) {
    $data = fetchFreshData($api_key);
    
    // Save to cache if request was successful
    if ($data && isset($data['result']) && $data['result'] === 'success') {
        file_put_contents($cache_file, json_encode($data));
    }
}

// Output the JSON data
echo json_encode($data, JSON_PRETTY_PRINT);
?>
