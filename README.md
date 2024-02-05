# Solana Connect Credenza Component

| PC Version | Mobile Version |
|:----------:|:--------------:|
| <img src="https://github.com/BankkRoll/solana-credenza/assets/106103625/204e21d4-910e-40e9-8cc9-a7c3d898942d" alt="PC Version" width="700"> | <img src="https://github.com/BankkRoll/solana-credenza/assets/106103625/69ff78bf-1fcc-4c0a-bc75-d2922f1130c7" alt="Mobile Version" width="200"> |

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

Now we need to build the custom Credenza component. Create a `credenza.tsx` file and copy-paste the content from [credenza.tsx](src/components/ui/credenza.tsx).
<details>
<summary>Click to show `credenza.tsx`</summary>

```tsx
"use client";

import * as React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/components/ui/use-media-query";

interface BaseProps {
  children: React.ReactNode;
}

interface RootCredenzaProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface CredenzaProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const desktop = "(min-width: 768px)";

const Credenza = ({ children, ...props }: RootCredenzaProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Credenza = isDesktop ? Dialog : Drawer;

  return <Credenza {...props}>{children}</Credenza>;
};

const CredenzaTrigger = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <CredenzaTrigger className={className} {...props}>
      {children}
    </CredenzaTrigger>
  );
};

const CredenzaClose = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <CredenzaClose className={className} {...props}>
      {children}
    </CredenzaClose>
  );
};

const CredenzaContent = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <CredenzaContent className={className} {...props}>
      {children}
    </CredenzaContent>
  );
};

const CredenzaDescription = ({
  className,
  children,
  ...props
}: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaDescription = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <CredenzaDescription className={className} {...props}>
      {children}
    </CredenzaDescription>
  );
};

const CredenzaHeader = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <CredenzaHeader className={className} {...props}>
      {children}
    </CredenzaHeader>
  );
};

const CredenzaTitle = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <CredenzaTitle className={className} {...props}>
      {children}
    </CredenzaTitle>
  );
};

const CredenzaBody = ({ className, children, ...props }: CredenzaProps) => {
  return (
    <ScrollArea className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </ScrollArea>
  );
};

const CredenzaFooter = ({ className, children, ...props }: CredenzaProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <CredenzaFooter className={className} {...props}>
      {children}
    </CredenzaFooter>
  );
};

export {
  Credenza,
  CredenzaTrigger,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
};
```
</details>
<br />

Last copy the `useMediaQuery` hook: [use-media-query.tsx](src/components/ui/use-media-query.tsx)
<details>
<summary>Click to show `use-media-query.tsx`</summary>

```tsx
import * as React from "react"

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false)

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener("change", onChange)
    setValue(result.matches)

    return () => result.removeEventListener("change", onChange)
  }, [query])

  return value
}
```
</details>

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
  ...
  ...
```

Implement the Credenza component as follows:

```jsx
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
```

## Credits

This component is built using shadcn/ui's dialog and drawer components on top of the Credenza. More information and the source code can be found here: [https://github.com/redpangilinan/credenza](https://github.com/redpangilinan/credenza).
