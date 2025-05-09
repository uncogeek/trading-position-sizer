// Instrument configurations
const instrumentConfig = {
  EURUSD: { pip: 0.0001, pipValue: 10, lotUnits: 100000, label: "EUR/USD", unit: "USD", decimals: 5 },
  GBPUSD: { pip: 0.0001, pipValue: 10, lotUnits: 100000, label: "GBP/USD", unit: "USD", decimals: 5 },
  USDJPY: { pip: 0.01, pipValue: 9.36, lotUnits: 100000, label: "USD/JPY", unit: "JPY", decimals: 3 },
  AUDUSD: { pip: 0.0001, pipValue: 10, lotUnits: 100000, label: "AUD/USD", unit: "USD", decimals: 5 },
  USDCAD: { pip: 0.0001, pipValue: 7.52, lotUnits: 100000, label: "USD/CAD", unit: "CAD", decimals: 5 },
  USDCHF: { pip: 0.0001, pipValue: 11.01, lotUnits: 100000, label: "USD/CHF", unit: "CHF", decimals: 5 },
  NZDUSD: { pip: 0.0001, pipValue: 10, lotUnits: 100000, label: "NZD/USD", unit: "USD", decimals: 5 },
  EURJPY: { pip: 0.01, pipValue: 9.36, lotUnits: 100000, label: "EUR/JPY", unit: "JPY", decimals: 3 },
  EURGBP: { pip: 0.0001, pipValue: 12.93, lotUnits: 100000, label: "EUR/GBP", unit: "GBP", decimals: 5 },
  EURAUD: { pip: 0.0001, pipValue: 6.28, lotUnits: 100000, label: "EUR/AUD", unit: "AUD", decimals: 5 },
  EURCAD: { pip: 0.0001, pipValue: 6.97, lotUnits: 100000, label: "EUR/CAD", unit: "CAD", decimals: 5 },
  GBPAUD: { pip: 0.0001, pipValue: 6.28, lotUnits: 100000, label: "GBP/AUD", unit: "AUD", decimals: 5 },
  AUDJPY: { pip: 0.01, pipValue: 9.36, lotUnits: 100000, label: "AUD/JPY", unit: "JPY", decimals: 3 },
  XAUUSD: { pip: 0.01, pipValue: 10, lotUnits: 100, label: "GOLD", unit: "USD", decimals: 2 },
  XAGUSD: { pip: 0.01, pipValue: 5, lotUnits: 5000, label: "SILVER", unit: "USD", decimals: 2 },
  USOIL: { pip: 0.01, pipValue: 10, lotUnits: 1000, label: "US OIL", unit: "USD", decimals: 2 },
  NASDAQ: { pip: 0.25, pipValue: 25, lotUnits: 1, label: "NASDAQ", unit: "USD", decimals: 2 },
  DOWJONES: { pip: 1, pipValue: 10, lotUnits: 1, label: "DOW JONES", unit: "USD", decimals: 0 },
  SP500: { pip: 0.25, pipValue: 25, lotUnits: 1, label: "S&P 500", unit: "USD", decimals: 2 },
  BTCUSDT: { pip: 1, pipValue: 1, lotUnits: 1, label: "BTC/USDT", unit: "USDT", decimals: 0 },
  ETHUSDT: { pip: 0.1, pipValue: 1, lotUnits: 1, label: "ETH/USDT", unit: "USDT", decimals: 1 }
};

function updateInstrumentDropdownWithPrices(apiPrices, manualPrices) {
  $('#instrument option').each(function() {
    const instrumentCode = $(this).val();
    const config = instrumentConfig[instrumentCode];
    
    if (!config) return; // Skip if configuration not found
    
    // Always set the original label first
    $(this).text(config.label);
    
    // Only add price if the toggle is on
    if (showPricesInDropdown !== false) {
      let currentPrice = null;
      
      // First check if there's a manual price available
      if (manualPrices[instrumentCode]) {
        currentPrice = manualPrices[instrumentCode];
      } else {
        // Get price based on instrument type from API
        if (instrumentCode === 'EURUSD') {
          currentPrice = apiPrices['EUR'] ? (1 / apiPrices['EUR']) : null;
        } else if (instrumentCode === 'GBPUSD') {
          currentPrice = apiPrices['GBP'] ? (1 / apiPrices['GBP']) : null;
        } else if (instrumentCode === 'AUDUSD') {
          currentPrice = apiPrices['AUD'] ? (1 / apiPrices['AUD']) : null;
        } else if (instrumentCode === 'NZDUSD') {
          currentPrice = apiPrices['NZD'] ? (1 / apiPrices['NZD']) : null;
        } else if (instrumentCode === 'USDJPY') {
          currentPrice = apiPrices['JPY'] || null;
        } else if (instrumentCode === 'USDCAD') {
          currentPrice = apiPrices['CAD'] || null;
        } else if (instrumentCode === 'USDCHF') {
          currentPrice = apiPrices['CHF'] || null;
        } else if (instrumentCode === 'EURJPY') {
          currentPrice = apiPrices['JPY'] && apiPrices['EUR'] ? (apiPrices['JPY'] / apiPrices['EUR']) : null;
        } else if (instrumentCode === 'EURGBP') {
          currentPrice = apiPrices['GBP'] && apiPrices['EUR'] ? (apiPrices['GBP'] / apiPrices['EUR']) : null;
        } else if (instrumentCode === 'EURAUD') {
          currentPrice = apiPrices['AUD'] && apiPrices['EUR'] ? (apiPrices['AUD'] / apiPrices['EUR']) : null;
        } else if (instrumentCode === 'EURCAD') {
          currentPrice = apiPrices['CAD'] && apiPrices['EUR'] ? (apiPrices['CAD'] / apiPrices['EUR']) : null;
        } else if (instrumentCode === 'GBPAUD') {
          currentPrice = apiPrices['AUD'] && apiPrices['GBP'] ? (apiPrices['AUD'] / apiPrices['GBP']) : null;
        } else if (instrumentCode === 'AUDJPY') {
          currentPrice = apiPrices['JPY'] && apiPrices['AUD'] ? (apiPrices['JPY'] / apiPrices['AUD']) : null;
        } else if (instrumentCode === 'BTCUSDT') {
          currentPrice = apiPrices['BTC'] || null;
        } else if (instrumentCode === 'ETHUSDT') {
          currentPrice = apiPrices['ETH'] || null;
        }
        // For other instruments, prices might not be available from the API
      }
      
      // Update option text with price if available
      if (currentPrice) {
        const originalText = config.label;
        $(this).text(`${originalText} ${currentPrice.toFixed(config.decimals > 2 ? 4 : 2)}`);
      }
    }
  });
}


function updateInterfaceForInstrument(instrument, apiPrices, manualPrices) {
  const config = instrumentConfig[instrument];
  const header = `Position Sizer (${config.label})`;
  $('h4').text(header);
  
  // Update input step and placeholders
  $('#entryPrice').attr('step', config.pip);
  $('#stopLoss').attr('step', config.pip);
  $('#takeProfit').attr('step', config.pip);
  
  // Update unit labels
  $('#entryUnit, #slUnit, #tpUnit').text(config.unit);
  
  // Clear inputs
  $('#entryPrice, #stopLoss, #takeProfit').val('');
  
  // Set price placeholder
  let currentPrice = null;
  
  // First check for manual price
  if (manualPrices[instrument]) {
    currentPrice = manualPrices[instrument];
  } 
  // Otherwise try API price if appropriate
  else if (instrument === 'EURUSD') {
    currentPrice = apiPrices['EUR'] ? (1 / apiPrices['EUR']) : null;
  } else if (instrument === 'GBPUSD') {
    currentPrice = apiPrices['GBP'] ? (1 / apiPrices['GBP']) : null;
  } else if (instrument === 'AUDUSD') {
    currentPrice = apiPrices['AUD'] ? (1 / apiPrices['AUD']) : null;
  } else if (instrument === 'NZDUSD') {
    currentPrice = apiPrices['NZD'] ? (1 / apiPrices['NZD']) : null;
  } else if (instrument === 'USDJPY') {
    currentPrice = apiPrices['JPY'] || null;
  } else if (instrument === 'USDCAD') {
    currentPrice = apiPrices['CAD'] || null;
  } else if (instrument === 'USDCHF') {
    currentPrice = apiPrices['CHF'] || null;
  } else if (instrument === 'EURJPY') {
    currentPrice = apiPrices['JPY'] && apiPrices['EUR'] ? (apiPrices['JPY'] / apiPrices['EUR']) : null;
  } else if (instrument === 'EURGBP') {
    currentPrice = apiPrices['GBP'] && apiPrices['EUR'] ? (apiPrices['GBP'] / apiPrices['EUR']) : null;
  } else if (instrument === 'EURAUD') {
    currentPrice = apiPrices['AUD'] && apiPrices['EUR'] ? (apiPrices['AUD'] / apiPrices['EUR']) : null;
  } else if (instrument === 'EURCAD') {
    currentPrice = apiPrices['CAD'] && apiPrices['EUR'] ? (apiPrices['CAD'] / apiPrices['EUR']) : null;
  } else if (instrument === 'GBPAUD') {
    currentPrice = apiPrices['AUD'] && apiPrices['GBP'] ? (apiPrices['AUD'] / apiPrices['GBP']) : null;
  } else if (instrument === 'AUDJPY') {
    currentPrice = apiPrices['JPY'] && apiPrices['AUD'] ? (apiPrices['JPY'] / apiPrices['AUD']) : null;
  } else if (instrument === 'BTCUSDT') {
    currentPrice = apiPrices['BTC'] || null;
  } else if (instrument === 'ETHUSDT') {
    currentPrice = apiPrices['ETH'] || null;
  }
  
  // If no price is available, use default placeholder
  if (!currentPrice) {
    switch(instrument) {
      case 'EURUSD': currentPrice = 1.0850; break;
      case 'GBPUSD': currentPrice = 1.2650; break;
      case 'USDJPY': currentPrice = 148.50; break;
      case 'AUDUSD': currentPrice = 0.6550; break;
      case 'NZDUSD': currentPrice = 0.6100; break;
      case 'USDCAD': currentPrice = 1.3800; break;
      case 'USDCHF': currentPrice = 0.8900; break;
      case 'EURJPY': currentPrice = 161.50; break;
      case 'EURGBP': currentPrice = 0.8550; break;
      case 'EURAUD': currentPrice = 1.6550; break;
      case 'EURCAD': currentPrice = 1.4950; break;
      case 'GBPAUD': currentPrice = 1.9350; break;
      case 'AUDJPY': currentPrice = 98.50; break;
      case 'XAUUSD': currentPrice = 2175.00; break;
      case 'XAGUSD': currentPrice = 28.75; break;
      case 'USOIL': currentPrice = 75.50; break;
      case 'NASDAQ': currentPrice = 18250.75; break;
      case 'DOWJONES': currentPrice = 39000; break;
      case 'SP500': currentPrice = 5250.50; break;
      case 'BTCUSDT': currentPrice = 67500; break;
      case 'ETHUSDT': currentPrice = 3250.5; break;
      default: currentPrice = config.decimals > 2 ? 1.0000 : 100.00;
    }
  }
  
  // Set placeholders based on current price
  $('#entryPrice').attr('placeholder', currentPrice.toFixed(config.decimals));
  $('#stopLoss').attr('placeholder', (currentPrice * 0.995).toFixed(config.decimals));
  $('#takeProfit').attr('placeholder', (currentPrice * 1.01).toFixed(config.decimals));
  
  // Calculate again with new instrument
  calculate(instrument);
}

function calculate(instrument) {
  const config = instrumentConfig[instrument];
  
  // Get input values
  const accountBalance = parseFloat($('#accountBalance').val()) || 0;
  const entryPrice = parseFloat($('#entryPrice').val()) || 0;
  const stopLoss = parseFloat($('#stopLoss').val()) || 0;
  const takeProfit = parseFloat($('#takeProfit').val()) || 0;
  const riskPercent = parseFloat($('#riskPercent').val()) || 0;
  const leverage = parseFloat($('#leverage').val()) || 1;
  const direction = $('#tradeDirection .active').data('direction');
  
  // Calculate risk amount in USD
  const riskUSD = accountBalance * riskPercent / 100;
  $('#riskUSD').text('$' + riskUSD.toFixed(2));
  
  // Calculate risk in pips
  let riskPips = 0;
  if (entryPrice && stopLoss) {
    const pipFactor = 1 / config.pip;
    riskPips = (direction === 'long') ? 
      Math.abs(entryPrice - stopLoss) * pipFactor : 
      Math.abs(stopLoss - entryPrice) * pipFactor;
  }
  $('#riskPips').text(riskPips.toFixed(0));
  
  // Calculate reward in pips
  let rewardPips = 0;
  if (entryPrice && takeProfit) {
    const pipFactor = 1 / config.pip;
    rewardPips = (direction === 'long') ? 
      Math.abs(takeProfit - entryPrice) * pipFactor : 
      Math.abs(entryPrice - takeProfit) * pipFactor;
  }
  $('#rewardPips').text(rewardPips.toFixed(0));
  
  // Calculate lot size based on instrument's pip value
  let lotSize = 0;
  if (riskPips > 0 && config.pipValue > 0) {
    lotSize = riskUSD / (riskPips * config.pipValue);
  }
  $('#lotSize').text(lotSize.toFixed(2));
  
  // Position size in units
  const positionSizeUnits = lotSize * config.lotUnits;
  $('#positionSize').text(positionSizeUnits.toFixed(0) + ' units');
  
  // Calculate reward/risk ratio
  let rr = 0;
  if (entryPrice && stopLoss && takeProfit) {
    rr = (direction === 'long') ? 
      Math.abs(takeProfit - entryPrice) / Math.abs(entryPrice - stopLoss) : 
      Math.abs(entryPrice - takeProfit) / Math.abs(stopLoss - entryPrice);
  }
  $('#rrRatio').text(rr.toFixed(2));
  
  // Calculate potential reward in USD
  const rewardUSD = rr * riskUSD;
  $('#rewardUSD').text('$' + rewardUSD.toFixed(2));
  
  // Calculate position size in USD (varies by instrument)
  let positionSizeUSD = 0;
  
  if (instrument === 'XAUUSD' || instrument === 'XAGUSD' || instrument === 'USOIL' || 
      instrument === 'BTCUSDT' || instrument === 'ETHUSDT') {
    // Commodities and Crypto are quoted in USD per unit
    positionSizeUSD = positionSizeUnits * entryPrice;
  } else if (instrument === 'NASDAQ' || instrument === 'DOWJONES' || instrument === 'SP500') {
    // Index positions are valued directly
    positionSizeUSD = positionSizeUnits * entryPrice;
  } else if (instrument.startsWith('USD')) {
    // For USD/xxx pairs, convert to USD value
    positionSizeUSD = positionSizeUnits / entryPrice;
  } else {
    // For xxx/USD pairs, value is straightforward
    positionSizeUSD = positionSizeUnits * entryPrice;
  }
  
  // Calculate position margin with leverage
  const positionMargin = positionSizeUSD / leverage;
  $('#positionMargin').text('$' + positionMargin.toFixed(2));
  
  // Calculate free margin
  const freeMargin = accountBalance - positionMargin;
  $('#freeMargin').text('$' + freeMargin.toFixed(2));
}
