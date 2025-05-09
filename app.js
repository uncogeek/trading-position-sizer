// Global variable to store API prices with default values
let apiPrices = {
  EUR: 0.9239,
  GBP: 0.7739,
  AUD: 1.5925,
  JPY: 149.1428,
  CAD: 1.4345,
  CHF: 0.8828,
  NZD: 1.6393,
  BTC: 67500, // Default BTC price in USD
  ETH: 3250.5  // Default ETH price in USD
};

// Manual price array for when API fails or for custom prices
let manualPrices = {
  EURUSD: 1.0811,   // Updated price
  GBPUSD: 1.2911,   // Updated price
  USDJPY: 149.29,   // Updated price
  AUDUSD: 0.6268,   // Updated price
  USDCAD: 1.4348,   // Updated price
  USDCHF: 0.8832,   // Updated price
  NZDUSD: 0.6100,   // Added price
  EURJPY: 161.52,   // Added price
  EURGBP: 0.8550,   // Added price
  EURAUD: 1.6550,   // Added price
  EURCAD: 1.4950,   // Added price
  GBPAUD: 1.9350,   // Added price
  AUDJPY: 98.50,    // Added price
  XAUUSD: 3022.00,  // Updated price
  XAGUSD: 35.75,    // Added price
  USOIL: 78.50,     // Added price
  NASDAQ: 19794.40, // Updated price
  DOWJONES: 41985.00, // Updated price
  SP500: 5250.50,   // Added price
  BTCUSDT: 85000.20, // Updated price
  ETHUSDT: 3250.50   // Added price
};

// Show prices in dropdown flag
let showPricesInDropdown = false;

// Event listeners
// Event listeners
$(document).ready(function() {
  // Calculate on input change
  $('input').on('input change', function() {
    calculate($('#instrument').val());
  });
  
  // Trade direction buttons
  $('#tradeDirection button').click(function(){
    $('#tradeDirection button').removeClass('active');
    $(this).addClass('active');
    calculate($('#instrument').val());
  });
  
  // Instrument dropdown change
  $('#instrument').change(function(){
    updateInterfaceForInstrument($(this).val(), apiPrices, manualPrices);
  });
  
  // New toggle prices button functionality
  $('#togglePriceBtn').on('click', function() {
    showPricesInDropdown = !showPricesInDropdown;
    
    // Change the icon based on state
    if(showPricesInDropdown) {
        $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/><path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708"/></svg>');
      
    } else {
      $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.88 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.88-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/></svg>');
    }
    
    // Update dropdown with or without prices
    updateInstrumentDropdownWithPrices(apiPrices, manualPrices);
  });
  
  // "Get Prices" button functionality
  $('#getPricesBtn').on('click', function() {
    $.ajax({
      url: 'https://v6.exchangerate-api.com/v6/62eac722a60234e0f739dec2/latest/USD',
      method: 'GET',
      success: function(response) {
        if (response.result === 'success') {
          apiPrices = response.conversion_rates;
          // Add crypto prices if not in API response
          if (!apiPrices['BTC']) {
            apiPrices['BTC'] = manualPrices['BTCUSDT']; 
          }
          if (!apiPrices['ETH']) {
            apiPrices['ETH'] = manualPrices['ETHUSDT'];
          }
          updateInstrumentDropdownWithPrices(apiPrices, manualPrices);
          updateInterfaceForInstrument($('#instrument').val(), apiPrices, manualPrices);
          alert('Prices updated successfully!');
        } else {
          alert('Failed to fetch prices. Using manual values.');
        }
      },
      error: function() {
        alert('Error fetching API data. Using manual values.');
      }
    });
  });
  
  // Initialize
  updateInterfaceForInstrument('EURUSD', apiPrices, manualPrices);
  updateInstrumentDropdownWithPrices(apiPrices, manualPrices);
});
