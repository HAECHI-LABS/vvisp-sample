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

1. Install `vvisp`. See [Details](https://github.com/HAECHI-LABS/vvisp#usage)
1. Sample files are already made.
Change the written address at `variables/owner` in `service.vvisp.json` file to an address which will send transactions.
1. Make `from` variable in `vvisp-config.js`. See [details](https://github.com/HAECHI-LABS/vvisp/blob/dev/CONFIGURATION.md#vvisp-configjs).
1. Run `vvisp deploy-service` at root directory.
It will act like [this demo](https://youtu.be/tEpBaaZDGpw).
1. Wait for deploying the sample app.
Then, `state.vvisp.json` will be generated. **Do not delete this file.**

### Upgrade to Second Version
Add contract property at `service.vvisp.json`.

Then, run `vvisp deploy-service`.
It will act like [this demo](https://youtu.be/f4WaBhsk_IQ).

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
- [deploy-service](https://github.com/HAECHI-LABS/vvisp/commands/README.md#deploy-service): Deploy service of your contracts
- [configuration files](https://github.com/HAECHI-LABS/vvisp/CONFIGURATION.md): Configuration guide about `vvisp-config.js ` and `service.vvisp.json`

## Contact 

- General Contact: hello@haechi.io
- [Facebook](https://www.facebook.com/HAECHILABS/)
- [Medium](https://medium.com/haechi-labs)
