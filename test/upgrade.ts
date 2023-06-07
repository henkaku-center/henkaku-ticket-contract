import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { CommunityToken, Ticket, TicketV2 } from '../typechain-types'
import { ethers, upgrades } from 'hardhat'
import { deployAndDistributeCommunityToken, deployTicket } from './helper/deploy'
import { expect } from 'chai'

describe('RegisterTicket', () => {
  let TicketContract: Ticket | TicketV2
  let CommunityTokenContract: CommunityToken
  let deployer: SignerWithAddress
  let creator: SignerWithAddress
  let user1: SignerWithAddress
  let user2: SignerWithAddress
  let user3: SignerWithAddress

  before(async () => {
    ;[deployer, creator, user1, user2, user3] = await ethers.getSigners()
    CommunityTokenContract = await deployAndDistributeCommunityToken({
      deployer,
      addresses: [creator.address, user1.address, user2.address, user3.address, deployer.address],
      amount: ethers.utils.parseEther('1000'),
    })
    TicketContract = await deployTicket(CommunityTokenContract.address)
  })

  it('register creative', async () => {
    let now = (await ethers.provider.getBlock('latest')).timestamp

    // @dev test emit register creative
    await expect(
      TicketContract.connect(creator).registerTicket(
        2,
        'ipfs://test1',
        100,
        now,
        now + 1000000000000,
        [creator.address, deployer.address],
        [60, 40]
      )
    )
      .to.emit(TicketContract, 'RegisterTicket')
      .withArgs(
        creator.address,
        now,
        now + 1000000000000,
        2,
        1,
        100,
        'ipfs://test1',
        [60, 40],
        [creator.address, deployer.address]
      )

    let tokenURI = await TicketContract.uri(1)
    expect(tokenURI).equal('ipfs://test1')

    let getAllRegisteredTickets = await TicketContract.retrieveAllTickets()
    expect(getAllRegisteredTickets.length).to.equal(2)
    expect(getAllRegisteredTickets[1].uri).to.equal('ipfs://test1')
    expect(getAllRegisteredTickets[1].creator).to.equal(creator.address)
    expect(getAllRegisteredTickets[1].maxSupply).to.equal(2)

    let getRegisteredTicket = await TicketContract.retrieveRegisteredTicket(1)
    expect(getRegisteredTicket.uri).to.equal('ipfs://test1')
    expect(getRegisteredTicket.creator).to.equal(creator.address)
    expect(getRegisteredTicket.maxSupply).to.equal(2)

    const registeredTickets = await TicketContract.retrieveRegisteredTickets(creator.address)
    expect(registeredTickets[0].uri).to.equal('ipfs://test1')
    expect(registeredTickets[0].creator).to.equal(creator.address)
    expect(registeredTickets[0].maxSupply).to.equal(2)
  })

  it('upgrade ticket contract', async () => {
    const TicketV2Factory = await ethers.getContractFactory('TicketV2')
    const TicketV2 = (await upgrades.upgradeProxy(TicketContract.address, TicketV2Factory)) as TicketV2

    await TicketV2.deployed()

    expect(TicketV2.address).to.equal(TicketContract.address)

    TicketContract = TicketV2
  })

  it('new function', async () => {
    const val = await (TicketContract as TicketV2).newFunction()
    expect(val).to.equal(1)
  })

  it('retrieve registered ticket v1', async () => {
    let tokenURI = await TicketContract.uri(1)
    expect(tokenURI).equal('ipfs://test1')

    let getAllRegisteredTickets = await TicketContract.retrieveAllTickets()
    expect(getAllRegisteredTickets.length).to.equal(2)
    expect(getAllRegisteredTickets[1].uri).to.equal('ipfs://test1')
    expect(getAllRegisteredTickets[1].creator).to.equal(creator.address)
    expect(getAllRegisteredTickets[1].maxSupply).to.equal(2)

    let getRegisteredTicket = await TicketContract.retrieveRegisteredTicket(1)
    expect(getRegisteredTicket.uri).to.equal('ipfs://test1')
    expect(getRegisteredTicket.creator).to.equal(creator.address)
    expect(getRegisteredTicket.maxSupply).to.equal(2)

    const registeredTickets = await TicketContract.retrieveRegisteredTickets(creator.address)
    expect(registeredTickets[0].uri).to.equal('ipfs://test1')
    expect(registeredTickets[0].creator).to.equal(creator.address)
    expect(registeredTickets[0].maxSupply).to.equal(2)
  })
})
