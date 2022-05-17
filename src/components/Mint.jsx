import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import mint from '../utils/mint.json';

const networks = {
    polygon: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: "Polygon Testnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
};

const Mint = () => {
    const [contract, setContract] = useState([]);
    const [change, setChange] = useState(false);

    const [data,setData] = useState("");

    useEffect(()=>{
        const loadContract = async () => 
        {
            if(window.ethereum)
            {
                const provider = new ethers.providers.Web3Provider(window.ethereum);

                if (provider.network !== "matic") {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                        {
                            ...networks["polygon"],
                        },
                        ],
                    });
                }

                const signer = provider.getSigner();

                const contract = new ethers.Contract("0x07c9e782a7fbb32cab60a64e302f8503705edfb6", mint, signer);

                console.log(contract)

                setContract(contract);
            }
            else 
            {
                console.log("metamask not installed");
            }
        }

        loadContract()
    },[])

    const submitHandler = async (e) => 
    {
        e.preventDefault();

        if(window.ethereum)
        {

            await window.ethereum.request({ method: "eth_requestAccounts" });

            setChange(true)

            try {
                const res = await contract.mint(data);
                res.wait();

                setChange(false)
                setData("")

            } catch (error) {
                console.log(error)
                setChange(false)
                setData("")
            }
        }
        else 
        {
            console.log("metamask not installed");
        }
    }
  return (
    <div className='container mt-5' style={{width:'40%'}}>
        <form onSubmit={submitHandler}>
            <div class="mb-3">
                <label for="" class="form-label"></label>
                <input type="number" class="form-control" placeholder='Mint' value={data} onChange={(e)=>setData(e.target.value)} />
            </div>
            <div class="d-grid gap-2">
                {
                    change ? <button type="button" class="btn btn-primary">
                        <div class="text-center">
                        <div class="spinner-border spinner-border-sm" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        </div>
                    </button> : <button class="btn btn-primary" type="submit">Mint</button>
                }
            </div>
        </form>
    </div>
  )
}

export default Mint