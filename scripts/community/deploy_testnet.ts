import * as dotenv from 'dotenv'
import { ethers } from 'hardhat'
import { Ticket__factory } from '../../typechain-types'

dotenv.config()

const main = async () => {
  const DemoTokenFactory = await ethers.getContractFactory('DemoToken')
  const DemoTokenContract = await DemoTokenFactory.deploy()
  await DemoTokenContract.deployed()

  const TicketFactory = (await ethers.getContractFactory('Ticket')) as Ticket__factory
  const TicketContract = await TicketFactory.deploy('web3Ticket', 'W3T', DemoTokenContract.address)
  await TicketContract.deployed()

  console.log(`CommunityToken: ${DemoTokenContract.address}`)
  console.log(`Ticket  : ${TicketContract.address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
