import * as dotenv from 'dotenv'
import { ethers, upgrades } from 'hardhat'
import { Ticket__factory } from '../../typechain-types'

dotenv.config()

const main = async () => {
  const FEE_DATA = {
    maxFeePerGas: ethers.utils.parseUnits('150', 'gwei'),
    maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'),
  } as any
  const provider = new ethers.providers.FallbackProvider([ethers.provider], 1)
  provider.getFeeData = async () => FEE_DATA
  const signer = new ethers.Wallet(process.env.TEST_PRIVATE_KEY!, provider).connect(provider)

  const TicketFactory = (await ethers.getContractFactory('Ticket', signer)) as Ticket__factory
  const TicketContract = await upgrades.deployProxy(
    TicketFactory,
    ['TEST PYNT Ticket', 'PT', '0xF3D5ED9d90282c6BAB684113073D9B97ea1afcc4'],
    { initializer: 'initialize' }
  )
  await TicketContract.deployed()

  console.log(`Ticket  : ${TicketContract.address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
