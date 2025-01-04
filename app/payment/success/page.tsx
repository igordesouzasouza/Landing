export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Pagamento Realizado com Sucesso!
        </h1>
        <p className="text-gray-600">
          Obrigado por sua compra. Em breve você receberá um e-mail com os detalhes.
        </p>
      </div>
    </div>
  );
} 