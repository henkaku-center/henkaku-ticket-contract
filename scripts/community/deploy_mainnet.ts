import * as dotenv from 'dotenv'
import { ethers, upgrades } from 'hardhat'
import { Ticket__factory } from '../../typechain-types'

dotenv.config()

const main = async () => {
  const TicketFactory = (await ethers.getContractFactory('Ticket')) as Ticket__factory
  const TicketContract = await upgrades.deployProxy(TicketFactory, ['HenkakuTicket', 'HT', process.env.HENKAKU_V2_ADDRESS!], {initializer: 'initialize'})
  await TicketContract.deployed()

  console.log(`TicketContractAddress: ${TicketContract.address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
