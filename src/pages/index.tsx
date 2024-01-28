import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTrigger,
} from "@/components/ui/credenza";

import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { select, wallets } = useWallet();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Credenza>
        <CredenzaTrigger asChild>
          <Button>Connect</Button>
        </CredenzaTrigger>
        <CredenzaContent className="h-[50svh] max-sm:max-h-[60svh]">
          <CredenzaHeader className="text-center justify-center items-center">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Connect a Wallet on <br /> Solana to Continue
            </h2>
          </CredenzaHeader>
          <CredenzaBody className="overflow-y-auto">
            {wallets.map((wallet) => (
              <div
                key={wallet.adapter.name}
                className="flex items-center justify-between p-3 hover:bg-gray-800 rounded cursor-pointer"
                onClick={() => {
                  select(wallet.adapter.name);
                }}
              >
                <div className="flex items-center">
                  <img
                    className="w-6 h-6 mr-2"
                    src={wallet.adapter.icon}
                    alt={wallet.adapter.name}
                  />
                  <span className="text-white">{wallet.adapter.name}</span>
                </div>
                {wallet.readyState === "Installed" && (
                  <span className="text-sm text-gray-400">Detected</span>
                )}
              </div>
            ))}
          </CredenzaBody>
          <CredenzaFooter className="text-center">
            <img
              src="/solanaLogo.svg"
              alt="Solana Logo"
              className="w-full h-3"
            />
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </main>
  );
}
