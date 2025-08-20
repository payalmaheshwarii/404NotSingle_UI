import React from 'react';

const Premium = () => {
  // Handle click on "Buy Now"
  const handleBuy = (plan) => {
    console.log(`User selected: ${plan} Membership`);

    // Mock payment flow — replace with real Razorpay integration here
    alert(`Redirecting to payment for ${plan} Membership...`);

    // TODO: Trigger Razorpay Checkout here
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-10 w-full">
      <h1 className="text-3xl font-bold text-center">Premium Membership Plans</h1>

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
        {/* Silver Membership */}
        <div className="card w-full lg:w-1/3 bg-slate-100 shadow-xl rounded-box p-6">
          <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Silver Membership</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Access to basic networking features</li>
            <li>View limited profiles per day</li>
            <li>Send up to 5 connection requests daily</li>
            <li>Email support</li>
          </ul>
          <button
            className="btn btn-primary w-full"
            onClick={() => handleBuy('Silver')}
          >
            Buy Now - ₹199
          </button>
        </div>

        {/* Gold Membership */}
        <div className="card w-full lg:w-1/3 bg-yellow-100 shadow-xl rounded-box p-6">
          <h2 className="text-xl font-semibold text-center mb-4 text-yellow-800">Gold Membership</h2>
          <ul className="list-disc list-inside text-yellow-700 space-y-2 mb-4">
            <li>Unlimited profile views</li>
            <li>Priority placement in search</li>
            <li>Send unlimited connection requests</li>
            <li>Access to group chats</li>
          </ul>
          <button
            className="btn btn-warning w-full"
            onClick={() => handleBuy('Gold')}
          >
            Buy Now - ₹499
          </button>
        </div>

        {/* Platinum Membership */}
        <div className="card w-full lg:w-1/3 bg-indigo-100 shadow-xl rounded-box p-6">
          <h2 className="text-xl font-semibold text-center mb-4 text-indigo-800">Platinum Membership</h2>
          <ul className="list-disc list-inside text-indigo-700 space-y-2 mb-4">
            <li>Everything in Gold + Silver</li>
            <li>1-on-1 professional mentorship sessions</li>
            <li>Early access to new features</li>
            <li>Dedicated account manager</li>
          </ul>
          <button
            className="btn btn-accent w-full"
            onClick={() => handleBuy('Platinum')}
          >
            Buy Now - ₹999
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
