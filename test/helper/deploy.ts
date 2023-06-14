import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { BigNumber } from 'ethers'
import { CommunityToken, CommunityToken__factory, Ticket, Ticket__factory } from '../../typechain-types'
import { ethers, upgrades } from 'hardhat'

export const deployTicket = async (communityTokenAddr: string) => {
  const TicketFactory = (await ethers.getContractFactory('Ticket')) as Ticket__factory
  const TicketContract = await upgrades.deployProxy(TicketFactory, ['CommunityTicket', 'CT', communityTokenAddr], {
    initializer: 'initialize',
  })
  await TicketContract.deployed()
  return TicketContract as Ticket
}

export const deployAndDistributeCommunityToken: (params: {
  deployer: SignerWithAddress
  addresses: string[]
  amount: BigNumber
}) => Promise<CommunityToken> = async ({ deployer, addresses, amount }) => {
  const CommunityTokenFactory = (await ethers.getContractFactory('CommunityToken')) as CommunityToken__factory
  const CommunityTokenContract = await CommunityTokenFactory.connect(deployer).deploy()
  await CommunityTokenContract.deployed()

  await CommunityTokenContract.addWhitelistUsers(addresses)

  for (const address of addresses) {
    await CommunityTokenContract.mint(address, amount)
  }

  return CommunityTokenContract
}
