# VVISP tutorial - installation

to install vvisp in your computer, run

`$ npm install -g @haechi-labs/vvisp`

or

`$ yarn global add @haechi-labs/vvisp`

in your command line tool.

After installation, check if you succeeded by

`$ vvisp --version`

### Requirements

- NodeJs
- python2.7(node-gyp requirements)



# VVISP tutorial - start a project

To start a project with `vvisp`, you should make an empty directory and run `vvisp init` in the directory.

```shell
$ mkdir vvisp-tutorial
$ cd vvisp-tutorial
$ vvisp init
```



```shell
~/Haechi/vvisp-tutorial
❯ vvisp init



    `7MMF'   `7MF'`7MMF'   `7MF'`7MMF' .M"""bgd `7MM"""Mq.
      `MA     ,V    `MA     ,V    MM  ,MI    "Y   MM   `MM.
       VM:   ,V      VM:   ,V     MM  `MMb.       MM   ,M9
        MM.  M'       MM.  M'     MM    `YMMNq.   MMmmdM9
        `MM A'        `MM A'      MM  .     `MM   MM
         :MM;          :MM;       MM  Mb     dM   MM
          VF            VF      .JMML.P"Ybmmd"  .JMML.



@haechi-labs/vvisp v0.3.2
  Command Line Interface for the Upgradeable Smart Contract Framework

Initializing Directory...
Success!

  Run vvisp -h for more information
  Clone git+https://github.com/HAECHI-LABS/vvisp.git for Contributing!

```

This will generate boilerplate codes for developing smart contracts.

```shell
~/Haechi/vvisp-tutorial
❯ tree -a
.
├── .env
├── .gitignore
├── .solcover.js
├── .soliumignore
├── .soliumrc.json
├── contracts
│   ├── Migrations.sol
│   └── upgradeable
│       └── VvispRegistry.sol
├── migrations
│   └── 1_initial_migration.js
├── package.json
├── scripts
│   ├── coverage.sh
│   └── test.sh
├── service.vvisp.json
├── test
│   └── Example.test.js
└── truffle-config.js

5 directories, 14 files
```

Since our project is compatible with truffle, directory structure is similar to `truffle init` structure

- `contracts/` : Directory for Solidity contracts
- `migrations/` : Directory for truffle migration files
- `test/` : Directory for test files
- `truffle-config.js` : Truffle configuration file
- `scripts/` : Directory for test environment 
- `service.vvisp.json` : Description file for deploying smart contract service.
- `vvisp-config.js` : vvisp configuration file



# VVISP tutorial - Environment Setting



# VVISP tutorial - Command

`vvisp --help` will show you details about vvisp commands.

```shell
~/Haechi/vvisp-tutorial
❯ vvisp --help
Usage: vvisp <command> [options]

where <command> is one of: abi-to-script, compile, deploy-contract, deploy-service, init, flatten, console

Options:
  -v, --version  output the version number
  -s, --silent   do not print logs
  -h, --help     output usage information

Commands:

   abi-to-script <files...>             	generate javascript libraries communicating the smart contracts

   compile [files...]                   	compile the smart contracts

   deploy-contract <file> [arguments...]	deploy the smart contracts

   deploy-service                       	deploy or upgrade smart contracts using the deployment configure file

   init [name]                          	initialize directory to use vvisp

   flatten <files...>                   	flatten the smart contracts

   console [script-api-path]            	run interactive shell to execute contract scripts
```



Overall work flow of deploying smart contract using vvisp command is

**init** -> **deploy-service/deploy-contract/compile** -> **abi-to-script** -> **console**

In this section, we will work through whole process using our sample contracts, [vvisp-sample](https://github.com/HAECHI-LABS/vvisp-sample).

### init

1. `vvisp init` will initialize a current directory(should be empty) to start a project and set an environment.
   **In our case, since vvisp-sample repository is already initialized, we will skip this part.**
   If you are making a new project, run `vvisp init` inside a project folder.

2. run `yarn install` to download modules

3. open `.env` file and change `MNEMONIC` part to match mnemonic of your blockchain node.
   If you are using ganache-cli, `-m` option will enable you to put personal mnemonic.

   ex. `ganaeche-cli -m 'hello'` will run ganache-cli with 'hello' mnemonic

4. Write contract in `contracts/` folder.
   If you are using vvisp-sample, your contracts are already in the folder.

### deploy-service/deploy-contract/compile

- `vvisp compile` will compile solidity files located in `contracts/` folder.
- `vvisp deploy-contract` will deploy a specified contract based on passed arguments.
  It will compile that contract if it is not compiled.
- `vvisp deploy-service` will deploy whole service based on arguments written in `service.vvisp.json`



We will use `deploy-service` for the tutorial.

1. **Write your own `service.vvisp.json`**

   First, write down your service name:

   ```json
   {
     "serviceName": "Haechi-Games"
   }
   ```

   Then, write down contracts and file paths you want to deploy:

   ```json
   {
     "serviceName": "Haechi-Games",
     "contracts": {
       "Haechi": {
         "path": "contracts/Haechi.sol"
       },
       "Gym": {
         "path": "contracts/HaechiGym.sol"
       },
       "Token": {
         "path": "contracts/SampleToken.sol"
       }
     }
   }
   ```

   If your contract needs argument in constructor, make `constructorArguments` field and put arguments as array.

   ```json
   {
     "serviceName": "Haechi-Games",
     "contracts": {
       "Haechi": {
         "path": "contracts/Haechi.sol"
       },
       "Gym": {
         "path": "contracts/HaechiGym.sol"
       },
       "Token": {
         "path": "contracts/SampleToken.sol",
         "constructorArguments": [
           1000000000
         ]
       }
     }
   }
   ```

   If your contract needs initializing before functioning properly, you can set `initialize` field and define function and arguments for initializing.

   In our case, `Haechi` and `Gym` needs to know each other's address. 

   ```json
   {
     "serviceName": "Haechi-Games",
     "contracts": {
       "Haechi": {
         "path": "contracts/Haechi.sol",
         "initialize": {
           "functionName": "initialize",
           "arguments": [
             //GYM contract address needs to go here
           ]
         }
       },
       "Gym": {
         "path": "contracts/HaechiGym.sol",
         "initialize": {
           "functionName": "setHaechiContract",
           "arguments": [
             //Haechi contract address needs to go here
           ]
         }
       },
       "Token": {
         "path": "contracts/SampleToken.sol",
         "constructorArguments": [
           1000000000
         ],
         "initialize": {
           "functionName": "transfer",
           "arguments": [
             //target address needs to go here
             100000000
           ]
         }
       }
     }
   }
   
   ```

   when you need variables to be shown more readable, you can also set field to hold variables.

   ```json
   {
     "serviceName": "Haechi-Games",
     "variables": {
       "totalSupply": 1000000000,
       "myFriend": "0x88C22c3Fe7A049e42cF4f3a5507e6820F0EceE61"
     },
     "contracts": {
       "Haechi": {
         "path": "contracts/Haechi.sol",
         "initialize": {
           "functionName": "initialize",
           "arguments": [
             //GYM contract address needs to go here
           ]
         }
       },
       "Gym": {
         "path": "contracts/HaechiGym.sol",
         "initialize": {
           "functionName": "setHaechiContract",
           "arguments": [
             //Haechi contract address needs to go here
           ]
         }
       },
       "Token": {
         "path": "contracts/SampleToken.sol",
         "constructorArguments": [
           "${variables.totalSupply}"
         ],
         "initialize": {
           "functionName": "transfer",
           "arguments": [
             "${variables.myFriend}",
             100000000
           ]
         }
       }
     }
   }
   ```

   Since initialize step runs after full deployment, you can get contract address by `${contracts.ContractName.address}`

   ```json
   {
     "serviceName": "Haechi-Games",
     "variables": {
       "totalSupply": 1000000000,
       "myFriend": "0x88C22c3Fe7A049e42cF4f3a5507e6820F0EceE61"
     },
     "contracts": {
       "Haechi": {
         "path": "contracts/Haechi.sol",
         "initialize": {
           "functionName": "initialize",
           "arguments": [
             "${contracts.Gym.address}"
           ]
         }
       },
       "Gym": {
         "path": "contracts/HaechiGym.sol",
         "initialize": {
           "functionName": "setHaechiContract",
           "arguments": [
             "${contracts.Haechi.address}"
           ]
         }
       },
       "Token": {
         "path": "contracts/SampleToken.sol",
         "constructorArguments": [
           "${variables.totalSupply}"
         ],
         "initialize": {
           "functionName": "transfer",
           "arguments": [
             "${variables.myFriend}",
             100000000
           ]
         }
       }
     }
   }
   ```

2. now, run `vvisp deploy-service`

   ```shell
   vvisp-sample git/master*  9s
   ❯ vvisp deploy-service
   
   Start Deploying Haechi-Games...
   
   (node:37989) V8: /usr/local/lib/node_modules/@haechi-labs/vvisp/node_modules/@haechi-labs/vvisp-utils/node_modules/.cache/vvisp/soljson-v0.4.24+commit.e67f0147.js:3 Invalid asm.js: Invalid member of stdlib
   Compiling...
   compile contracts/upgradeable/VvispRegistry.sol...
   compile contracts/Haechi.sol...
   compile contracts/HaechiGym.sol...
   compile contracts/SampleToken.sol...
   Check Arguments...
   Done
   
   Check Dependencies...
   Done
   
   Now Start Deploying Contracts...
   
   Registry Deploying...
   Registry Created!
   Done Contract Address: 0xe42850F1A95661E7C909978485C6AFcAd4045294
   
   	NonUpgradeable Contracts
   Deploying Contracts...
   
   Haechi Contract Deploying...
   Haechi Contract Created!
   Done Contract Address: 0xd66598cDB22D7Ec07f13B0eb46391C0390b17FAc
   
   HaechiGym Contract Deploying...
   HaechiGym Contract Created!
   Done Contract Address: 0x91057A012134A0d4bD27F1bac5533328abbDc1D4
   
   SampleToken Contract Deploying...
   SampleToken Contract Created!
   Done Contract Address: 0xE0e6442dB1724525A44b518c89a19a5BbFCbB3f6
   
   	Registering NonUpgradeable Contracts' Information at Registry...
   Done Transaction Hash: 0xe0ec0c6ef12bfa1a13d9a762777ac740298f689905a3c76e3092a9b3ff816fdb
   
   	Start Initialize NonUpgradeable Contracts...
   Initializing Haechi...
   Done Transaction Hash: 0x39100c6a67d9bfc2d7980d44081e05254fcddbafaa9c1bae14607c3fa23f8e82
   
   Initializing HaechiGym...
   Done Transaction Hash: 0xb05b7e64f604a9b3372b0c569c636dc1e89c0bf1999c3e791b92099d73e8f296
   
   Initializing SampleToken...
   Done Transaction Hash: 0x8d1cee49908e9bc62728d4c198d7fc9d796cfc817e6620f39ad8cbf36058b15f
   
   Deploying Haechi-Games Finished
   You can see result in state.haechi.json
   ```

   If everything is set, you should see similar result as above.

   When it's done your contracts are now deployed to ganache-cli or whatever blockchain you are using.

### abi-to-script

`vvisp abi-to-script` will generate abis and script for calling smart contract functions with javascript.
Generated files will be placed in `contractApis/` folder.

In vvisp-sample, we need to generate for 3 contracts

- Haechi.sol
- Gym.sol
- SampleToken.sol

So following commands are needed.

```shell
$ vvisp abi-to-script contracts/Haechi.sol contracts/Gym.sol contracts/SampltToken.sol
```

After running the commands, structure of `contractApis/` will be:

```shell
vvisp-sample git/master
❯ tree contractApis
contractApis
└── back
    ├── abi
    │   ├── Haechi.json
    │   ├── HaechiGym.json
    │   └── SampleToken.json
    ├── index.js
    └── js
        ├── Haechi.js
        ├── HaechiGym.js
        └── SampleToken.js

3 directories, 7 files
```

`vvisp console` uses contractApis to interact with smart contracts.

If smart contracts written in `service.vvisp.json` does not exists in `contractApis/` , `vvisp console` will throw error.

### console

Now it's time for `vvisp console`

```shell
vvisp-sample git/master
❯ vvisp console
Available contract contracts:

Index				Contract				Address
[0]					Haechi					0xd66598cDB22D7Ec07f13B0eb46391C0390b17FAc
[1]					HaechiGym				0x91057A012134A0d4bD27F1bac5533328abbDc1D4
[2]					SampleToken				0xE0e6442dB1724525A44b518c89a19a5BbFCbB3f6


If you are wondering how to use it, type help command.
Use exit or Ctrl-c to exit
>>
```

When you run vvisp console, you can see contracts and contract addresses you can interact

Now call

`help`

```shell
>> help
Usage: <command> [<args...>]

where <command> is one of: call, show, list, help

Commands:

	register                                                             register the address of smart contracts

	list                                                                 list the available smart contracts

	show     <Contract>                                                  show the available method of a smart contract

	call     <Contract> <Method> [Params...]                             call a smart contract api method


>>
```

You can see lists of commands you can use in `vvisp console`.

- `register`: For contracts not included in `service.vvisp.json` but exists in `contractApis/`.
You can register an address.

- `list` : A command you can see which contracts you can use.
- `show` : Show methods of a certain contract.
- `call` : Call a function with parameters.



Let's start with `show`

```shell
>> show Haechi

[Method]								[Args]
velocities                              [__id]
haechiIds                               [__owner]
distances                               [__id]
gym                                     []
makeNewHaechi                           [__id, options]
increaseVelocity                        [__haechiId, __diff, options]
run                                     [options]
initialize                              [__gym, options]

>>
```

`show Haechi` will list all methods of `Haechi` contract.

#### creating Haechi

Let's create new Haechi.

Before creating, check if user has Haechi.

In `ganache-cli`, there are addresses generated by using mnemonic.

`vvisp deploy-service` and `vvisp console` use 0th address as default, check if 0th address has any haechi.

```shell
#ganache-cli
Ganache CLI v6.2.5 (ganache-core: 2.3.3)

Available Accounts
==================
(0) 0xb5f4e40c8177ad63b19d4d3a254a5758771f57d0 (~100 ETH)
(1) 0x88c22c3fe7a049e42cf4f3a5507e6820f0ecee61 (~100 ETH)
(2) 0x21316db8b17ae5dfc9bad37e3284464bb68d2f32 (~100 ETH)
(3) 0x0d1026b22cc806c02095dfa2192f27eedd3f32a4 (~100 ETH)
(4) 0x0ead804e15b8a5f8fd2c9fc78e953482ec666d84 (~100 ETH)
(5) 0xacc1ef5fe7adfe9375d41c5935450e4be82ecaf1 (~100 ETH)
(6) 0xabbd0b2b59cac72e8ef7b1524e4cf581059a9265 (~100 ETH)
(7) 0x570fe1d8d5ef82e496cb0fd1ae6c6c25080613ea (~100 ETH)
(8) 0x4523a964742d72a6769b56e3bf1e03b2cf215c26 (~100 ETH)
(9) 0x18255937e636f860f80d99393677c796b62d0971 (~100 ETH)
```

```shell
#vvisp console
>> call Haechi haechiIds 0xb5f4e40c8177ad63b19d4d3a254a5758771f57d0
"0"
>>
```

Since we did not created any haechi after deployment, 0th address has no haechi so returns `0`.

Let's create haechi by calling `makeNewHaechi`.

```shell
>> call Haechi makeNewHaechi 1234
{
  "transactionHash": "0x7942a6462d22b58f0e80f4cae7723426ec83a7a37b2c32bc740b9407b4bb10fe",
  "transactionIndex": 0,
  "blockNumber": 9,
  "from": "0xb5f4e40c8177ad63b19d4d3a254a5758771f57d0",
  "to": "0xd66598cdb22d7ec07f13b0eb46391c0390b17fac",
  "gasUsed": 63933,
  "logs": [
    {
      "transactionHash": "0x7942a6462d22b58f0e80f4cae7723426ec83a7a37b2c32bc740b9407b4bb10fe",
      "name": "NewHaechi",
      "args": {
        "id": "1234",
        "owner": "0xb5F4E40c8177Ad63B19D4D3a254a5758771f57d0"
      }
    }
  ]
}
>>
```

Printed json object is receipt describing the transaction.

In "logs" field, you can see `NewHaechi` event called with
```
'1234', '0xb5F4E40c8177Ad63B19D4D3a254a5758771f57d0'
```

1234 will be our haechi's id.

Now, check haechiId is owned by 0th address.

```shell
>> call Haechi haechiIds 0xb5f4e40c8177ad63b19d4d3a254a5758771f57d0
"1234"
>>
```

