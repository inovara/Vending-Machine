import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Building, Clock, ArrowRight } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}


const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animation trigger handled by CSS classes
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 bg-section-dark relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-inovara-primary-10 to-inovara-secondary-10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-inovara-accent-10 to-inovara-primary-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        
        {/* Subtle particles */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-inovara-accent/30 rounded-full animate-float"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-inovara-secondary/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-inovara-primary/30 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6 animate-fade-in-up">
            <span className="text-white">Ready to Transform</span>
            <br />
            <span className="gradient-text">Your Business Future?</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-inovara-primary to-inovara-accent rounded-full mx-auto mb-8 animate-width-expand"></div>
          <p className="text-xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Join 500+ Fortune 500 companies who trust Inovara to deliver enterprise-grade technology solutions that drive digital transformation, accelerate growth, and secure competitive advantage. Let's build the future together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Company Details Card */}
          <div className="lg:col-span-1">
            <div className="group relative bg-gradient-to-br from-luxury-steel/50 to-luxury-charcoal/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-3xl opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500"></div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-inovara-primary to-inovara-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    🏢
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Inovara Corporation</h3>
                    <p className="text-white/70 text-sm">Global Technology Innovation Leader</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-inovara-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white/90 text-sm font-medium">Global Headquarters</p>
                      <p className="text-white/70 text-xs">Innovation District, Technology Hub</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-inovara-accent flex-shrink-0" />
                    <p className="text-white/80 text-sm">+1 555 INOVARA</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-inovara-accent flex-shrink-0" />
                    <p className="text-white/80 text-sm">hello@inovara.com</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-inovara-accent flex-shrink-0" />
                    <p className="text-white/80 text-sm">24/7 Innovation Engine</p>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    Core Services
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-inovara-accent rounded-full"></div>
                      <span className="text-xs text-white/90">Software Engineering</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-inovara-accent rounded-full"></div>
                      <span className="text-xs text-white/90">AI Solutions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-inovara-accent rounded-full"></div>
                      <span className="text-xs text-white/90">Digital Transformation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-inovara-accent rounded-full"></div>
                      <span className="text-xs text-white/90">Enterprise Systems</span>
                    </div>
                  </div>
                </div>

                {/* Company Info */}
                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-inovara-accent rounded-full"></div>
                      <span className="text-xs text-white/70 font-medium">Established 2019</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-inovara-accent rounded-full"></div>
                      <span className="text-xs text-white/70 font-medium">Global Operations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-luxury-steel/50 to-luxury-charcoal/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 bg-luxury-charcoal/50 border rounded-xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                          focusedField === 'name' 
                            ? 'border-inovara-accent shadow-lg shadow-inovara-accent/30 ring-2 ring-inovara-accent/20' 
                            : 'border-white/20 hover:border-white/30'
                        }`}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 bg-luxury-charcoal/50 border rounded-xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                          focusedField === 'email' 
                            ? 'border-inovara-accent shadow-lg shadow-inovara-accent/30 ring-2 ring-inovara-accent/20' 
                            : 'border-white/20 hover:border-white/30'
                        }`}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 bg-luxury-charcoal/50 border rounded-xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                          focusedField === 'phone' 
                            ? 'border-inovara-accent shadow-lg shadow-inovara-accent/30 ring-2 ring-inovara-accent/20' 
                            : 'border-white/20 hover:border-white/30'
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 bg-luxury-charcoal/50 border rounded-xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                          focusedField === 'company' 
                            ? 'border-inovara-accent shadow-lg shadow-inovara-accent/30 ring-2 ring-inovara-accent/20' 
                            : 'border-white/20 hover:border-white/30'
                        }`}
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      className={`w-full px-4 py-3 bg-luxury-charcoal/50 border rounded-xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 resize-none ${
                        focusedField === 'message' 
                          ? 'border-inovara-accent shadow-lg shadow-inovara-accent/30 ring-2 ring-inovara-accent/20' 
                          : 'border-white/20 hover:border-white/30'
                      }`}
                      placeholder="Tell us about your project or requirements..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full px-8 py-4 bg-gradient-to-r from-inovara-primary to-inovara-secondary text-white font-semibold rounded-xl shadow-2xl hover:shadow-inovara-primary/25 transition-all duration-300 transform hover:scale-105 btn-luxury disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Launching Your Vision...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Start the Revolution
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-inovara-primary to-inovara-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Welcome to the Inovara Revolution!</h3>
                  <p className="text-white/80 mb-6">Your message has been received by our innovation team. We'll connect with you within 24 hours to discuss how Inovara can transform your vision into reality.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-inovara-accent hover:text-white transition-colors duration-300 flex items-center mx-auto"
                  >
                    Share Another Vision
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
