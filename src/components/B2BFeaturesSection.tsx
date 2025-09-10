import React, { useState } from 'react';
import { Calculator, Download, Users, TrendingUp, Clock, CheckCircle, ArrowRight, FileText, Video, Phone } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const B2BFeaturesSection: React.FC = () => {
  const { t, isRTL } = useTranslation();
  const [roiData, setRoiData] = useState({
    machines: 10,
    dailyTransactions: 50,
    averageTransaction: 3.50,
    monthlyRevenue: 0,
    monthlyCosts: 0,
    monthlyProfit: 0,
    annualProfit: 0,
    paybackPeriod: 0
  });

  const calculateROI = () => {
    const dailyRevenue = roiData.machines * roiData.dailyTransactions * roiData.averageTransaction;
    const monthlyRevenue = dailyRevenue * 30;
    const monthlyCosts = roiData.machines * 200; // Estimated monthly costs per machine
    const monthlyProfit = monthlyRevenue - monthlyCosts;
    const annualProfit = monthlyProfit * 12;
    const paybackPeriod = (roiData.machines * 15000) / monthlyProfit; // Assuming $15k per machine

    setRoiData(prev => ({
      ...prev,
      monthlyRevenue,
      monthlyCosts,
      monthlyProfit,
      annualProfit,
      paybackPeriod
    }));
  };

  React.useEffect(() => {
    calculateROI();
  }, [roiData.machines, roiData.dailyTransactions, roiData.averageTransaction]);

  const leadGenerationForms = [
    {
      title: 'Solution Request Form',
      description: 'Detailed requirements gathering for customized vending solutions',
      icon: FileText,
      fields: ['Company Details', 'Industry Type', 'Machine Requirements', 'Budget Range', 'Timeline'],
      gradient: 'from-inovara-primary to-inovara-secondary'
    },
    {
      title: 'Demo Request',
      description: 'Schedule product demonstrations and live machine testing',
      icon: Video,
      fields: ['Contact Information', 'Preferred Date', 'Location Details', 'Demo Type', 'Attendees'],
      gradient: 'from-inovara-secondary to-inovara-accent'
    },
    {
      title: 'Quote Request',
      description: 'Get detailed pricing and configuration estimates',
      icon: Calculator,
      fields: ['Machine Specifications', 'Quantity Needed', 'Installation Requirements', 'Service Level', 'Payment Terms'],
      gradient: 'from-inovara-accent to-inovara-neutral'
    },
    {
      title: 'Support Contact',
      description: 'Technical assistance and maintenance support requests',
      icon: Phone,
      fields: ['Issue Description', 'Machine Model', 'Priority Level', 'Contact Method', 'Location'],
      gradient: 'from-inovara-neutral to-inovara-primary'
    }
  ];

  return (
    <section id="b2b-features" className={`professional-section bg-section-light ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="professional-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-professional-heading text-inovara-primary mb-6">
            {t('b2b.title')} <span className="text-gradient-primary">{t('b2b.titleAccent')}</span>
          </h2>
          <p className="text-professional-subheading text-inovara-primary/80 max-w-3xl mx-auto">
            {t('b2b.description')}
          </p>
        </div>

        {/* ROI Calculator */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-inovara-primary-10 to-inovara-secondary-10 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-inovara-accent to-inovara-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-inovara-primary mb-4">
                {t('b2b.roi.title')}
              </h3>
              <p className="text-inovara-primary/70 text-lg max-w-2xl mx-auto">
                {t('b2b.roi.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Input Section */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-inovara-primary mb-6">{t('b2b.roi.machines')}</h4>
                
                <div>
                  <label className="block text-inovara-primary/80 text-sm font-medium mb-2">
                    {t('b2b.roi.machines')}
                  </label>
                  <input
                    type="number"
                    value={roiData.machines}
                    onChange={(e) => setRoiData(prev => ({ ...prev, machines: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-white/10 border border-inovara-primary/20 rounded-xl text-inovara-primary focus:border-inovara-accent focus:ring-2 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300"
                    min="1"
                    max="1000"
                  />
                </div>

                <div>
                  <label className="block text-inovara-primary/80 text-sm font-medium mb-2">
                    {t('b2b.roi.transactions')}
                  </label>
                  <input
                    type="number"
                    value={roiData.dailyTransactions}
                    onChange={(e) => setRoiData(prev => ({ ...prev, dailyTransactions: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-white/10 border border-inovara-primary/20 rounded-xl text-inovara-primary focus:border-inovara-accent focus:ring-2 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300"
                    min="1"
                    max="500"
                  />
                </div>

                <div>
                  <label className="block text-inovara-primary/80 text-sm font-medium mb-2">
                    {t('b2b.roi.average')} ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={roiData.averageTransaction}
                    onChange={(e) => setRoiData(prev => ({ ...prev, averageTransaction: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-white/10 border border-inovara-primary/20 rounded-xl text-inovara-primary focus:border-inovara-accent focus:ring-2 focus:ring-inovara-accent/20 focus:outline-none transition-all duration-300"
                    min="0.01"
                    max="100"
                  />
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-inovara-primary mb-6">{t('b2b.roi.results.monthlyRevenue')}</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-inovara-accent mb-1">
                      ${roiData.monthlyRevenue.toLocaleString()}
                    </div>
                    <div className="text-inovara-primary/70 text-sm">{t('b2b.roi.results.monthlyRevenue')}</div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-inovara-secondary mb-1">
                      ${roiData.monthlyCosts.toLocaleString()}
                    </div>
                    <div className="text-inovara-primary/70 text-sm">{t('b2b.roi.results.monthlyCosts')}</div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-inovara-primary mb-1">
                      ${roiData.monthlyProfit.toLocaleString()}
                    </div>
                    <div className="text-inovara-primary/70 text-sm">{t('b2b.roi.results.monthlyProfit')}</div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-inovara-accent mb-1">
                      ${roiData.annualProfit.toLocaleString()}
                    </div>
                    <div className="text-inovara-primary/70 text-sm">{t('b2b.roi.results.annualProfit')}</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-inovara-accent-20 to-inovara-primary-20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-inovara-primary mb-2">
                    {roiData.paybackPeriod.toFixed(1)} {isRTL ? 'شهر' : 'months'}
                  </div>
                  <div className="text-inovara-primary/70 text-sm">{t('b2b.roi.results.paybackPeriod')}</div>
                </div>

                <button className="w-full btn-enterprise px-6 py-3 text-base focus-ring">
                  <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    {t('b2b.roi.calculate')}
                    <ArrowRight className={`${isRTL ? 'mr-2' : 'ml-2'} h-4 w-4`} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Generation Forms */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-inovara-primary text-center mb-12">
            Lead Generation Tools
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadGenerationForms.map((form, index) => {
              const IconComponent = form.icon;
              return (
                <div
                  key={index}
                  className="card-professional-interactive group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${form.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-inovara-primary mb-4 group-hover:text-inovara-accent transition-colors duration-300">
                    {form.title}
                  </h4>
                  
                  <p className="text-inovara-primary/70 text-sm mb-6 leading-relaxed">
                    {form.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {form.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="flex items-center text-sm text-inovara-primary/60">
                        <CheckCircle className="w-4 h-4 text-inovara-accent mr-2 flex-shrink-0" />
                        <span>{field}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full btn-secondary px-4 py-2 text-sm focus-ring">
                    <span className="flex items-center justify-center">
                      Access Form
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional B2B Resources */}
        <div className="bg-gradient-to-r from-inovara-primary-10 to-inovara-secondary-10 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-inovara-primary mb-4">
              Enterprise Resources
            </h3>
            <p className="text-inovara-primary/70 text-lg max-w-2xl mx-auto">
              Access comprehensive resources designed for business decision-makers and procurement teams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-inovara-accent to-inovara-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-inovara-primary mb-2">White Papers</h4>
              <p className="text-inovara-primary/70 text-sm mb-4">
                Technical documentation and industry insights
              </p>
              <button className="text-inovara-accent hover:text-inovara-primary transition-colors duration-300 flex items-center mx-auto">
                <Download className="mr-2 h-4 w-4" />
                Download
              </button>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-inovara-secondary to-inovara-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-inovara-primary mb-2">Case Studies</h4>
              <p className="text-inovara-primary/70 text-sm mb-4">
                Industry-specific success stories and ROI examples
              </p>
              <button className="text-inovara-accent hover:text-inovara-primary transition-colors duration-300 flex items-center mx-auto">
                <ArrowRight className="mr-2 h-4 w-4" />
                View All
              </button>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-inovara-primary mb-2">Webinars</h4>
              <p className="text-inovara-primary/70 text-sm mb-4">
                Educational content and product demonstrations
              </p>
              <button className="text-inovara-accent hover:text-inovara-primary transition-colors duration-300 flex items-center mx-auto">
                <Clock className="mr-2 h-4 w-4" />
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2BFeaturesSection;
