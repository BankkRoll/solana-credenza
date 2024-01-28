# Solana Connect Credenza Component

## Features
- **Adaptive/Responsive UI**: Adapts between desktop and mobile interfaces using a dialog for desktop and a drawer for mobile, powered by shadcn/ui components.
- **Seamless Wallet Integration**: Supports a variety of Solana wallets via `@solana/wallet-adapter-react`.

## Implementation Overview
- The component uses `shadcn/ui`'s Drawer and Dialog components to create a responsive interface that adapts to the user's device.
- Solana wallet connectivity is facilitated using `@solana/wallet-adapter-react`, managing wallet connections and interactions.
- The component is designed to automatically select the appropriate UI (drawer or dialog) based on the user's device, leveraging the `useMediaQuery` hook.

## Installation
To install the necessary dependencies for the Solana Connect Credenza Component, run the following commands:

```sh
npm install @solana/wallet-adapter-base @solana/wallet-adapter-wallets @solana/wallet-adapter-react @solana/web3.js
```

Ensure you have [shadcn/ui](https://ui.shadcn.com/docs/installation) installed. Then add the required components:

```sh
npx shadcn-ui@latest add button
npx shadcn-ui@latest add drawer
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add scroll-area
```

This installs the required Solana wallet adapters and shadcn/ui library for dialog, drawer, scroll-area, and button components.

Now we need to build the custom Credenza component. Create a `credenza.tsx` file and copy-paste the content from `./src/components/ui/credenza`.

## Usage
First, we need to set up our app to use the Solana wallet provider. The following setup is based on React and Next.js and may vary depending on the specific language libraries and coding frameworks you're using:

```javascript
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import React, { useMemo } from "react";
import type { AppProps } from "next/app";
import type { FC } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter({ network }),
      new SolflareWalletAdapter({ network }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
          <Component {...pageProps} />
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
```

To use the Solana Connect Credenza Component in your application, import the necessary components:

```javascript
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
  ...
  ...
```

Implement the Credenza component as follows:

```jsx
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
```

## Credits

This component is built using shadcn/ui's dialog and drawer components on top of the Credenza. More information and the source code can be found here: [https://github.com/redpangilinan/credenza](https://github.com/redpangilinan/credenza).
