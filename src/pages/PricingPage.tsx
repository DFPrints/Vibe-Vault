
import React, { useState } from 'react';
import { ArrowLeftIcon, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    billing: 'forever',
    features: [
      { title: 'Access to basic wallpapers', included: true },
      { title: '5 downloads per month', included: true },
      { title: 'SD quality only', included: true },
      { title: 'Premium wallpapers', included: false },
      { title: 'Remove watermarks', included: false },
      { title: 'Unlimited downloads', included: false }
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 7.99,
    billing: 'monthly',
    features: [
      { title: 'Access to basic wallpapers', included: true },
      { title: '50 downloads per month', included: true },
      { title: 'SD and HD quality', included: true },
      { title: 'Premium wallpapers', included: true },
      { title: 'Remove watermarks', included: true },
      { title: 'Unlimited downloads', included: false }
    ]
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: 14.99,
    billing: 'monthly',
    features: [
      { title: 'Access to basic wallpapers', included: true },
      { title: 'Unlimited downloads', included: true },
      { title: 'SD, HD and 4K quality', included: true },
      { title: 'Premium wallpapers', included: true },
      { title: 'Remove watermarks', included: true },
      { title: 'Early access to new wallpapers', included: true }
    ]
  }
];

const PricingPage = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly'|'yearly'>('monthly');
  
  const handleSubscribe = (plan: typeof plans[0]) => {
    if (plan.id === 'free') {
      toast.success("You're already on the free plan");
      return;
    }
    toast.success(`Subscribed to ${plan.name} plan`);
  };
  
  const getPrice = (price: number) => {
    if (price === 0) return 'Free';
    return billingCycle === 'yearly' ? `$${(price * 0.8).toFixed(2)}` : `$${price.toFixed(2)}`;
  };
  
  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b p-4">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1 mr-2 rounded-full hover:bg-muted"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-xl font-bold">Subscription Plans</h1>
        </div>
      </header>
      
      <div className="p-4">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Choose a subscription plan that works best for you
          </p>
          
          <div className="flex justify-center mt-4">
            <div className="inline-flex items-center rounded-lg border p-1 bg-muted/30">
              <button
                className={`px-4 py-2 rounded-md text-sm ${billingCycle === 'monthly' ? 'bg-white shadow-sm' : 'text-muted-foreground'}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm ${billingCycle === 'yearly' ? 'bg-white shadow-sm' : 'text-muted-foreground'}`}
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly
                <span className="ml-1 text-xs text-green-500">Save 20%</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map(plan => (
            <div 
              key={plan.id}
              className={`border rounded-lg p-5 ${plan.id === 'premium' ? 'border-wallpaper-purple/50 bg-wallpaper-purple/5' : ''}`}
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{getPrice(plan.price)}</span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground text-sm ml-1">
                      /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  )}
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-0.5">
                      {feature.included ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )}
                    </span>
                    <span className={feature.included ? '' : 'text-muted-foreground'}>
                      {feature.title}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.id === 'premium' ? 'bg-wallpaper-purple hover:bg-wallpaper-purple-dark' : ''}`}
                variant={plan.id === 'free' ? 'outline' : 'default'}
                onClick={() => handleSubscribe(plan)}
              >
                {plan.id === 'free' ? 'Current Plan' : 'Subscribe'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
