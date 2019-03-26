# vvisp-sample

> Sample repository about utilizing [vvisp](https://github.com/HAECHI-LABS/vvisp)

## Quick Usage
**1. Install vvisp**
```bash
$ npm install -g @haechi-labs/vvisp
#or you can run
$ yarn global add @haechi-labs/vvisp
```
**2. Initialize your directory**
```bash
$ mkdir vvisp-sample
$ cd vvisp-sample

$ vvisp init
$ npm install #or yarn install
```
**3. Make your Contracts at `contracts/`**

We do not recommend generated contracts by `$ vvisp init`.
Now, you can use `gen-script`, `compile` and `flatten` commands.

**4. Set `vvisp-config.js` file**

Please set environment variables in `vvisp-config.js` file.
See [here](https://github.com/HAECHI-LABS/vvisp/blob/dev/CONFIGURATION.md#config) for more information about `vvisp-config.js`.
Now you can use `deploy-contract` command.

**5. Set `service.vvisp.json` file**

Please set information about your DApp service in `service.vvisp.json`.
See [here](https://github.com/HAECHI-LABS/vvisp/blob/dev/CONFIGURATION.md#service) for more information about `service.vvisp.json`.
Now you can use `deploy-service` command.


## Quick Deployment of This Sample Repository
Download sample repository for test.
```bash
git clone https://github.com/HAECHI-LABS/vvisp-sample
```
### Deploy First Version

1. Sample `service.vvisp.json` file is already made.
1. Default network is `localhost:8545`.
Use your own client or ganache-cli. (`npm install -g ganache-cli` and `ganache-cli`)
1. Make `from` variable in `vvisp-config.js`. See [details](https://github.com/HAECHI-LABS/vvisp/blob/dev/CONFIGURATION.md#vvisp-configjs).
If you use ganache, get the mnemonic key used in ganache and enter it.
1. Run `vvisp deploy-service` at root directory.
It will act like [this demo](https://youtu.be/tEpBaaZDGpw).
1. Wait for deploying the sample app.
Then, `state.vvisp.json` will be generated. **This file is necessary to upgrade your service**

### Upgrade to Second Version
Delete `service.vvisp.json` and change `service2.vvisp.json` to `service.vvisp.json`.
The differences between `service.vvisp.json` and `service2.vvisp.json` are:

**`service.vvisp.json`**
```json
...
    "contracts": {
      "Haechi": {
        "upgradeable": true,
        "path": "contracts/HaechiV1.sol",
        "initialize": {
          "functionName": "initialize",
          "arguments": [
            "${variables.owner}",
            "${contracts.Gym.address}"
          ]
        }
      },
      ...
```
**`service2.vvisp.json`** 
```json
...
    "contracts": {
      "Haechi": {
        "upgradeable": true,
        "path": "contracts/HaechiV2.sol"
      },
      ...
```
Run `vvisp deploy-service`.
It will act like [this demo](https://youtu.be/f4WaBhsk_IQ).

### Use console
If the service is already deployed and has `state.vvisp.json`(**necessary**), you can operate your contracts with `vvisp console`.

First, make apis of contracts which are written in `state.vvisp.json`.
```bash
 $ vvisp gen-script contracts/Haechi.sol contracts/HaechiGym.sol contracts/SampleToken.sol
```

Then run `vvisp console` and operate functions of your contracts.

## Contract

- Create your own contracts in `contracts/` directory.
- Not recommend modifying contracts in `upgradeable/` directory.

## Test

- We support use [truffle](https://truffleframework.com/truffle) framework.
- Create test files in `test/` directory.
- Run `npm run test` to test all test files in `test/` directory or `npm run test <fileName>` to test specific file.

## Deploy

- Make `vvisp-config.js` and `service.vvisp.json`.

Please see linked documentation below for details:
- [deploy-contract](https://github.com/HAECHI-LABS/vvisp/commands/README.md#deploy-contract): Deploy contract
- [deploy-service](https://github.com/HAECHI-LABS/vvisp/commands/README.md#deploy-service): Deploy service according to Upgradeable Smart Contract Framework
- [console](https://github.com/HAECHI-LABS/vvisp/commands/README.md#console): Console to operate your contracts
- [configuration files](https://github.com/HAECHI-LABS/vvisp/CONFIGURATION.md): Configuration guide about `vvisp-config.js` and `service.vvisp.json`

## Contact 

- General Contact: hello@haechi.io
- [Facebook](https://www.facebook.com/HAECHILABS/)
- [Medium](https://medium.com/haechi-labs)
