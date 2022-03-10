import { useRouter } from "next/router";
import { useEffect } from "react";
import ConnectMetamask from "../components/connectMetamask";
import MnemonicComp from "../components/mnemonicComp";
import { useWeb3Context } from "../context/Web3Context";

export default function Home() {
  const { currentAccount } = useWeb3Context();
  const router = useRouter();

  // useEffect(() => {
  //   if (currentAccount) {
  //     router.push("/patient");
  //   }
  // }, [currentAccount]);

  return (
    <div className="bg-red-500 h-5">
      <MnemonicComp />
      <br />
      <ConnectMetamask />
    </div>
  );
}
