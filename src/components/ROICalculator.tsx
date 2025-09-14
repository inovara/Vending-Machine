import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Clock, BarChart3, Zap } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ROIData {
  machines: number;
  dailyTransactions: number;
  averageTransactionValue: number;
  operatingCosts: number;
  maintenanceCosts: number;
  electricityCosts: number;
  rentCosts: number;
}

interface ROICalculatorProps {
  className?: string;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ className = '' }) => {
  const { t, isRTL } = useTranslation();
  const { elementRef, animationStyle } = useScrollAnimation({
    threshold: 0.2,
    duration: 800
  });

  const [roiData, setRoiData] = useState<ROIData>({
    machines: 1,
    dailyTransactions: 50,
    averageTransactionValue: 15,
    operatingCosts: 200,
    maintenanceCosts: 100,
    electricityCosts: 50,
    rentCosts: 300
  });

  const [results, setResults] = useState({
    monthlyRevenue: 0,
    monthlyCosts: 0,
    monthlyProfit: 0,
    annualRevenue: 0,
    annualProfit: 0,
    roi: 0,
    paybackPeriod: 0
  });

  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    calculateROI();
  }, [roiData]);

  const calculateROI = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const monthlyRevenue = roiData.machines * roiData.dailyTransactions * roiData.averageTransactionValue * 30;
      const monthlyCosts = roiData.operatingCosts + roiData.maintenanceCosts + roiData.electricityCosts + roiData.rentCosts;
      const monthlyProfit = monthlyRevenue - monthlyCosts;
      const annualRevenue = monthlyRevenue * 12;
      const annualProfit = monthlyProfit * 12;
      
      // Assuming average machine cost of $10,000
      const machineCost = roiData.machines * 10000;
      const roi = (annualProfit / machineCost) * 100;
      const paybackPeriod = machineCost / monthlyProfit;

      setResults({
        monthlyRevenue,
        monthlyCosts,
        monthlyProfit,
        annualRevenue,
        annualProfit,
        roi,
        paybackPeriod
      });
      
      setIsCalculating(false);
    }, 500);
  };

  const handleInputChange = (field: keyof ROIData, value: number) => {
    setRoiData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatMonths = (months: number) => {
    if (months < 12) {
      return `${months.toFixed(1)} months`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths.toFixed(0)} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
    }
  };

  return (
    <div ref={elementRef} className={`bg-gradient-to-br from-inovara-neutral/5 to-inovara-sage/10 rounded-3xl p-8 border border-inovara-accent/20 ${className} ${isRTL ? 'rtl' : 'ltr'}`} style={animationStyle}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-inovara-accent to-inovara-secondary rounded-2xl mb-4">
            <Calculator className="w-8 h-8 text-inovara-primary" />
          </div>
          <h3 className="text-3xl font-bold text-inovara-primary mb-2">{t('roi.title')}</h3>
          <p className="text-inovara-secondary text-lg">{t('roi.subtitle')}</p>
        </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-inovara-primary mb-4">{t('roi.parameters')}</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-inovara-secondary mb-2">
                {t('roi.machines')}
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={roiData.machines}
                onChange={(e) => handleInputChange('machines', parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 border border-inovara-sage/30 rounded-lg focus:ring-2 focus:ring-inovara-accent/50 focus:border-inovara-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-inovara-secondary mb-2">
                Daily Transactions per Machine
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={roiData.dailyTransactions}
                onChange={(e) => handleInputChange('dailyTransactions', parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 border border-inovara-sage/30 rounded-lg focus:ring-2 focus:ring-inovara-accent/50 focus:border-inovara-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-inovara-secondary mb-2">
                Average Transaction Value ($)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                step="0.5"
                value={roiData.averageTransactionValue}
                onChange={(e) => handleInputChange('averageTransactionValue', parseFloat(e.target.value) || 1)}
                className="w-full px-4 py-3 border border-inovara-sage/30 rounded-lg focus:ring-2 focus:ring-inovara-accent/50 focus:border-inovara-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-inovara-secondary mb-2">
                Operating Costs ($/month)
              </label>
              <input
                type="number"
                min="0"
                max="10000"
                value={roiData.operatingCosts}
                onChange={(e) => handleInputChange('operatingCosts', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-inovara-sage/30 rounded-lg focus:ring-2 focus:ring-inovara-accent/50 focus:border-inovara-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-inovara-secondary mb-2">
                Maintenance Costs ($/month)
              </label>
              <input
                type="number"
                min="0"
                max="5000"
                value={roiData.maintenanceCosts}
                onChange={(e) => handleInputChange('maintenanceCosts', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-inovara-sage/30 rounded-lg focus:ring-2 focus:ring-inovara-accent/50 focus:border-inovara-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-inovara-secondary mb-2">
                Electricity Costs ($/month)
              </label>
              <input
                type="number"
                min="0"
                max="2000"
                value={roiData.electricityCosts}
                onChange={(e) => handleInputChange('electricityCosts', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-inovara-sage/30 rounded-lg focus:ring-2 focus:ring-inovara-accent/50 focus:border-inovara-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-inovara-secondary mb-2">
                Rent/Location Costs ($/month)
              </label>
              <input
                type="number"
                min="0"
                max="10000"
                value={roiData.rentCosts}
                onChange={(e) => handleInputChange('rentCosts', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-inovara-sage/30 rounded-lg focus:ring-2 focus:ring-inovara-accent/50 focus:border-inovara-accent transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-inovara-primary mb-4">Projected Results</h4>
          
          {isCalculating ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inovara-accent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-inovara-accent/20">
                <div className="flex items-center space-x-3 mb-2">
                  <DollarSign className="w-5 h-5 text-inovara-accent" />
                  <span className="text-sm font-medium text-inovara-secondary">Monthly Revenue</span>
                </div>
                <div className="text-2xl font-bold text-inovara-primary">{formatCurrency(results.monthlyRevenue)}</div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-inovara-accent/20">
                <div className="flex items-center space-x-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-inovara-accent" />
                  <span className="text-sm font-medium text-inovara-secondary">Monthly Profit</span>
                </div>
                <div className="text-2xl font-bold text-inovara-primary">{formatCurrency(results.monthlyProfit)}</div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-inovara-accent/20">
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart3 className="w-5 h-5 text-inovara-accent" />
                  <span className="text-sm font-medium text-inovara-secondary">Annual Revenue</span>
                </div>
                <div className="text-2xl font-bold text-inovara-primary">{formatCurrency(results.annualRevenue)}</div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-inovara-accent/20">
                <div className="flex items-center space-x-3 mb-2">
                  <Zap className="w-5 h-5 text-inovara-accent" />
                  <span className="text-sm font-medium text-inovara-secondary">ROI</span>
                </div>
                <div className="text-2xl font-bold text-inovara-primary">{formatPercentage(results.roi)}</div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-inovara-accent/20 sm:col-span-2">
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="w-5 h-5 text-inovara-accent" />
                  <span className="text-sm font-medium text-inovara-secondary">Payback Period</span>
                </div>
                <div className="text-2xl font-bold text-inovara-primary">{formatMonths(results.paybackPeriod)}</div>
              </div>
            </div>
          )}

          {/* Summary */}
          {!isCalculating && (
            <div className="mt-6 p-4 bg-gradient-to-r from-inovara-accent/10 to-inovara-secondary/10 rounded-xl border border-inovara-accent/20">
              <h5 className="font-semibold text-inovara-primary mb-2">Investment Summary</h5>
              <p className="text-sm text-inovara-secondary">
                With {roiData.machines} machine{roiData.machines > 1 ? 's' : ''}, you can expect to generate{' '}
                <span className="font-semibold text-inovara-accent">{formatCurrency(results.annualRevenue)}</span> in annual revenue
                with a return on investment of{' '}
                <span className="font-semibold text-inovara-accent">{formatPercentage(results.roi)}</span>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
