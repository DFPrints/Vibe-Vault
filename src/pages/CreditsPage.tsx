
import React from 'react';
import { ArrowLeftIcon, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const creditPackages = [
  { id: 1, amount: 100, price: 4.99, popular: false },
  { id: 2, amount: 500, price: 19.99, popular: true },
  { id: 3, amount: 1000, price: 34.99, popular: false }
];

const CreditsPage = () => {
  const navigate = useNavigate();
  
  const handlePurchase = (pkg: typeof creditPackages[0]) => {
    // In a real app, this would integrate with a payment processor
    toast.success(`Purchased ${pkg.amount} credits for $${pkg.price}`);
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
          <h1 className="text-xl font-bold">Buy Credits</h1>
        </div>
      </header>
      
      <div className="p-4">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Credits are used to download premium wallpapers. Purchase credits to unlock more options.
          </p>
        </div>
        
        <div className="grid gap-4">
          {creditPackages.map(pkg => (
            <div 
              key={pkg.id}
              className={`border rounded-lg p-4 relative ${pkg.popular ? 'border-wallpaper-purple/50 bg-wallpaper-purple/5' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 right-4 bg-wallpaper-purple text-white text-xs px-2 py-0.5 rounded-full">
                  Best Value
                </div>
              )}
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{pkg.amount} Credits</h3>
                  <p className="text-muted-foreground">
                    {pkg.amount < 500 ? 'Download up to 20 wallpapers' : 
                     pkg.amount < 1000 ? 'Download up to 100 wallpapers' : 
                     'Download unlimited wallpapers'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${pkg.price}</div>
                  <div className="text-xs text-muted-foreground">
                    ${(pkg.price / pkg.amount * 100).toFixed(2)}/credit
                  </div>
                </div>
              </div>
              <Button 
                className="w-full mt-4"
                onClick={() => handlePurchase(pkg)}
              >
                <CreditCard size={16} className="mr-2" />
                Purchase
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;
