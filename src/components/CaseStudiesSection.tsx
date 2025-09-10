import React, { useState } from 'react';
import { ArrowRight, Building, MapPin } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import { CaseStudy } from '../types';

interface CaseStudiesSectionProps {
  className?: string;
}

const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { elementRef, animationStyle } = useScrollAnimation({
    threshold: 0.2,
    duration: 800
  });

  const [selectedCase, setSelectedCase] = useState(0);

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: t('casestudies.cairo.title'),
      titleKey: 'casestudies.cairo.title',
      company: t('casestudies.cairo.company'),
      industry: t('casestudies.cairo.industry'),
      challenge: t('casestudies.cairo.challenge'),
      challengeKey: 'casestudies.cairo.challenge',
      solution: t('casestudies.cairo.solution'),
      solutionKey: 'casestudies.cairo.solution',
      results: [
        {
          metric: 'Employee Satisfaction',
          metricKey: 'casestudy.cairo.results.satisfaction',
          value: '+65%',
          improvement: 'Increase in employee satisfaction scores',
          improvementKey: 'casestudy.cairo.results.satisfaction.improvement'
        },
        {
          metric: 'Revenue Generated',
          metricKey: 'casestudy.cairo.results.revenue',
          value: '$45,000',
          improvement: 'Monthly revenue from vending operations',
          improvementKey: 'casestudy.cairo.results.revenue.improvement'
        },
        {
          metric: 'ROI',
          metricKey: 'casestudy.cairo.results.roi',
          value: '180%',
          improvement: 'Return on investment within 8 months',
          improvementKey: 'casestudy.cairo.results.roi.improvement'
        }
      ],
      image: '/api/placeholder/600/400'
    },
    {
      id: 2,
      title: 'Healthcare Facility Modernization',
      titleKey: 'casestudy.healthcare.title',
      company: 'Al-Azhar University Hospital',
      industry: 'Healthcare',
      challenge: 'Need for 24/7 food service for medical staff and visitors with strict hygiene requirements.',
      challengeKey: 'casestudy.healthcare.challenge',
      solution: 'Installed 8 premium vending machines with temperature-controlled compartments and contactless payment options.',
      solutionKey: 'casestudy.healthcare.solution',
      results: [
        {
          metric: 'Uptime',
          metricKey: 'casestudy.healthcare.results.uptime',
          value: '99.8%',
          improvement: 'Machine availability and reliability',
          improvementKey: 'casestudy.healthcare.results.uptime.improvement'
        },
        {
          metric: 'Customer Satisfaction',
          metricKey: 'casestudy.healthcare.results.satisfaction',
          value: '98%',
          improvement: 'Staff and visitor satisfaction rating',
          improvementKey: 'casestudy.healthcare.results.satisfaction.improvement'
        },
        {
          metric: 'Cost Savings',
          metricKey: 'casestudy.healthcare.results.savings',
          value: '$12,000',
          improvement: 'Monthly savings vs traditional cafeteria',
          improvementKey: 'casestudy.healthcare.results.savings.improvement'
        }
      ],
      image: '/api/placeholder/600/400'
    },
    {
      id: 3,
      title: 'Manufacturing Plant Efficiency',
      titleKey: 'casestudy.manufacturing.title',
      company: 'Nile Manufacturing Co.',
      industry: 'Manufacturing',
      challenge: 'Worker productivity issues due to limited access to refreshments during long shifts.',
      challengeKey: 'casestudy.manufacturing.challenge',
      solution: 'Strategic placement of 12 vending machines across production floors with shift-specific product offerings.',
      solutionKey: 'casestudy.manufacturing.solution',
      results: [
        {
          metric: 'Productivity',
          metricKey: 'casestudy.manufacturing.results.productivity',
          value: '+25%',
          improvement: 'Increase in worker productivity',
          improvementKey: 'casestudy.manufacturing.results.productivity.improvement'
        },
        {
          metric: 'Employee Retention',
          metricKey: 'casestudy.manufacturing.results.retention',
          value: '+40%',
          improvement: 'Reduction in turnover rate',
          improvementKey: 'casestudy.manufacturing.results.retention.improvement'
        },
        {
          metric: 'Revenue',
          metricKey: 'casestudy.manufacturing.results.revenue',
          value: '$28,000',
          improvement: 'Monthly vending revenue',
          improvementKey: 'casestudy.manufacturing.results.revenue.improvement'
        }
      ],
      image: '/api/placeholder/600/400'
    }
  ];

  const { containerRef, getItemAnimationStyle } = useStaggeredAnimation(caseStudies.length, 200);

  const formatCurrency = (value: string) => {
    return value.startsWith('$') ? value : `$${value}`;
  };

  return (
    <section ref={elementRef as React.RefObject<HTMLDivElement>} className={`py-20 px-6 bg-gradient-to-br from-inovara-primary/5 to-inovara-secondary/10 ${className}`} style={animationStyle}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-inovara-primary mb-6">
            Success <span className="bg-gradient-to-r from-inovara-accent to-inovara-secondary bg-clip-text text-transparent">Stories</span>
            </h2>
          <p className="text-xl text-inovara-secondary max-w-3xl mx-auto">
            Real results from real businesses across Egypt
          </p>
        </div>

        {/* Case Study Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {caseStudies.map((caseStudy, index) => (
                <button
              key={caseStudy.id}
              onClick={() => setSelectedCase(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCase === index
                  ? 'bg-gradient-to-r from-inovara-accent to-inovara-secondary text-inovara-primary shadow-lg'
                  : 'bg-white/50 text-inovara-secondary hover:bg-white/70'
              }`}
            >
              {caseStudy.company}
            </button>
          ))}
          </div>

        {/* Selected Case Study */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-inovara-accent/20 shadow-2xl mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building className="w-5 h-5 text-inovara-accent" />
                <span className="text-sm font-medium text-inovara-secondary">{caseStudies[selectedCase].industry}</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-inovara-primary mb-6">
                {caseStudies[selectedCase].title}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-inovara-primary mb-3">Challenge</h4>
                  <p className="text-inovara-secondary leading-relaxed">
                    {caseStudies[selectedCase].challenge}
              </p>
            </div>

                <div>
                  <h4 className="text-lg font-semibold text-inovara-primary mb-3">Solution</h4>
                  <p className="text-inovara-secondary leading-relaxed">
                    {caseStudies[selectedCase].solution}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-inovara-primary mb-4">Results</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseStudies[selectedCase].results.map((result, index) => (
                  <div key={index} className="bg-gradient-to-r from-inovara-accent/10 to-inovara-secondary/10 rounded-xl p-4">
                    <div className="text-2xl font-bold text-inovara-primary mb-1">
                      {result.metric.includes('Revenue') || result.metric.includes('Savings') 
                        ? formatCurrency(result.value)
                        : result.value
                      }
                    </div>
                    <div className="text-sm font-medium text-inovara-secondary mb-1">
                      {result.metric}
                    </div>
                    <div className="text-xs text-inovara-secondary/70">
                      {result.improvement}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Grid */}
        <div ref={containerRef as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <div
              key={caseStudy.id}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-inovara-accent/20 hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer"
              style={getItemAnimationStyle(index)}
              onClick={() => setSelectedCase(index)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-inovara-accent" />
                  <span className="text-sm font-medium text-inovara-secondary">{caseStudy.industry}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-inovara-accent group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-inovara-primary mb-3 group-hover:text-inovara-accent transition-colors duration-300">
                {caseStudy.title}
              </h3>
              
              <p className="text-inovara-secondary text-sm mb-4 leading-relaxed">
                {caseStudy.challenge}
              </p>
              
              <div className="space-y-2">
                {caseStudy.results.slice(0, 2).map((result, resultIndex) => (
                  <div key={resultIndex} className="flex items-center justify-between">
                    <span className="text-sm text-inovara-secondary">{result.metric}</span>
                    <span className="text-sm font-semibold text-inovara-primary">
                      {result.metric.includes('Revenue') || result.metric.includes('Savings') 
                        ? formatCurrency(result.value)
                        : result.value
                      }
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-inovara-sage/20">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-inovara-accent" />
                  <span className="text-sm text-inovara-secondary">{caseStudy.company}</span>
                </div>
              </div>
          </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-inovara-accent/10 to-inovara-secondary/10 rounded-3xl p-8 border border-inovara-accent/20">
            <h3 className="text-2xl md:text-3xl font-bold text-inovara-primary mb-4">
              Ready to Create Your Success Story?
            </h3>
            <p className="text-inovara-secondary mb-6 max-w-2xl mx-auto">
              Join hundreds of businesses across Egypt who have transformed their operations with our smart vending solutions.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-inovara-accent to-inovara-secondary text-inovara-primary font-bold rounded-xl hover:shadow-lg hover:shadow-inovara-accent/25 transition-all duration-300 transform hover:scale-105">
              Start Your Success Story
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;