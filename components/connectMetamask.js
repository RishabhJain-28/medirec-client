import { useEffect } from "react";
import { useWeb3Context } from "../context/Web3Context";

const ConnectMetamask = () => {
  const { connectWallet, currentAccount } = useWeb3Context();
  useEffect(() => {
    if (currentAccount) {
      //! swtich router
    }
  }, [currentAccount]);
  return (
    <div>
      {currentAccount ? (
        <div> Meta mask connected</div>
      ) : (
        <button onClick={connectWallet}> Connet to metamask</button>
      )}
    </div>
  );
};

export default ConnectMetamask;
