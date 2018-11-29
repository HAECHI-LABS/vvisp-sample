# vvisp-sample

> Sample repository about utilizing [vvisp](https://github.com/HAECHI-LABS/vvisp)

## Quick Usage
**1. Install vvsip**
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
```
**3. Make your Contracts at `contracts/`**

We do not recommend generated contracts by `$ vvisp init`.
Now, you can use `abi-to-script`, `compile` and `flatten` commands.

**4. Set `.env` file**

Please set environment variables in `.env` file.
See [here](https://github.com/HAECHI-LABS/vvisp/blob/dev/CONFIGURATION.md#env) for more information about `.env`.
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

1. Install `vvisp`. See [Details](https://github.com/HAECHI-LABS/vvisp#usage)
1. Sample files are already made.
Change the written address at `variables/owner` in `service.vvisp.json` file to an address which will send transactions.
1. Change the written mnemonic words at `MNEMONIC` in `.env` file to mnemonic words of owner account.
(If you don't want to connect to local 8545, see [here](https://github.com/HAECHI-LABS/vvisp/blob/dev/CONFIGURATION.md#env) and change `.env`.)
1. Run `vvisp deploy-service` at root directory.
1. Wait for deploying the sample app. Then, `state.vvisp.json` will be generated. **Do not delete this file.**

### Upgrade to Second Version
In `service.vvisp.json`, change
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
to 
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

## Contract

- Create your own contracts in `contracts/` directory.
- Not recommend modifying contracts in `libs/` and `upgradeable/` directory.

## Test

- We support use [truffle](https://truffleframework.com/truffle) framework.
- Create test files in `test/` directory.
- Run `npm run test` to test all test files in `test/` directory or `npm run test <fileName>` to test specific file.

## Deploy

- Make `.env` and `service.vvisp.json`.

Please see linked documentation below for details:
- [deploy-contract](https://github.com/HAECHI-LABS/vvisp/commands/README.md#deploy-contract): Deploy contract
- [deploy-service](https://github.com/HAECHI-LABS/vvisp/commands/README.md#deploy-service): Deploy service according to Upgradeable Smart Contract Framework
- [configuration files](https://github.com/HAECHI-LABS/vvisp/CONFIGURATION.md): Configuration guide about `.env ` and `service.vvisp.json`

## Contact 

- General Contact: hello@haechi.io
- [Facebook](https://www.facebook.com/HAECHILABS/)
- [Medium](https://medium.com/haechi-labs)
