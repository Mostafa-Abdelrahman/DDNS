import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import QRCode from 'qrcode';

const Buy = () => {
  const [searchParams] = useSearchParams();
  const [account, setAccount] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const domain = searchParams.get('domain');

  useEffect(() => {
    if (account) {
      generateQRCode(account);
    }
  }, [account]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        console.log('Connected account:', accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('Please install MetaMask to use this feature');
    }
  };

  const generateQRCode = async (address) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(address);
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handlePayment = async () => {
    if (window.ethereum && account) {
      const transactionParameters = {
        to: '0xYourContractAddress', // Replace with your contract or recipient address
        from: account,
        value: '0x29a2241af62c0000', // Example value in wei (0.1 ETH)
        data: '0xYourTransactionData' // Replace with your transaction data if any
      };
      try {
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        });
        console.log('Transaction hash:', txHash);
        alert('Transaction successful!');
      } catch (error) {
        console.error('Error sending transaction:', error);
      }
    } else {
      alert('Please connect your wallet first');
    }
  };

  return (
    <div className="container mx-auto mt-12 text-center">
      <h1 className="text-3xl font-bold mb-6">Buy Domain: {domain}</h1>
      <button
        id="connectWallet"
        onClick={connectWallet}
        className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      >
        Connect Wallet
      </button>
      {account && (
        <>
          <p className="mt-4 text-lg">Connected account: {account}</p>
          <div className="mt-6">
            {qrCodeUrl && (
              <div>
                <img src={qrCodeUrl} alt="QR Code" className="mx-auto" />
                <p className="mt-2">Scan this QR code with your MetaMask mobile app to pay</p>
              </div>
            )}
          </div>
          <button
            onClick={handlePayment}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          >
            Pay with MetaMask
          </button>
        </>
      )}
    </div>
  );
};

export default Buy;
