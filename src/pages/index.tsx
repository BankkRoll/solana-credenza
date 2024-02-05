import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTrigger,
} from "@/components/ui/credenza";

import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";

const WalletMultiButtonDynamic = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export default function Home() {
  const wallet = useWallet();
  const { select, wallets } = useWallet();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
        <Credenza>
          {!wallet.connected && (
            <CredenzaTrigger asChild>
              <Button size="lg" className="text-md rounded-sm p-6">
                Connect Wallet
              </Button>
            </CredenzaTrigger>
          )}
          {wallet.connected && <WalletMultiButtonDynamic />}

          <CredenzaContent className="h-[50svh] max-sm:max-h-[60svh]">
            <CredenzaHeader className="text-center justify-center items-center">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Connect a Wallet on <br /> Solana to Continue
              </h2>
            </CredenzaHeader>

            <CredenzaBody className="overflow-y-auto">
              {wallets.map((wallet) => (
                <CredenzaClose
                  key={wallet.adapter.name}
                  className="flex items-center justify-between p-3 hover:bg-gray-800 rounded cursor-pointer w-full"
                >
                  <div
                    className="flex justify-between items-center w-full"
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
                      <div className="flex justify-end">
                        <span className="text-sm text-gray-400">Detected</span>
                      </div>
                    )}
                  </div>
                </CredenzaClose>
              ))}
            </CredenzaBody>

            <CredenzaFooter className="text-center">
              <img
                src="https://solana.com/_next/static/media/solanaLogo.74d35f7a.svg"
                alt="Solana Logo"
                className="w-full h-3"
              />
            </CredenzaFooter>
          </CredenzaContent>
        </Credenza>
    </main>
  );
}
