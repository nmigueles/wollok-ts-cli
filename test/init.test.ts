import chai from 'chai'
import { join } from 'path'
import init, { Options } from '../src/commands/init'
import { existsSync, readFileSync, rmSync } from 'fs'
import sinon from 'sinon'

chai.should()
const expect = chai.expect

const project = join('examples', 'init-examples', 'basic-example')
const GITHUB_FOLDER = join('.github', 'workflows')

const baseOptions: Options = {
  project,
  noCI: false,
  noTest: false,
  game: false,
}

describe('testing init', () => {

  let processExitSpy: sinon.SinonStub

  beforeEach(() => {
    processExitSpy = sinon.stub(process, 'exit')
  })

  afterEach(() => {
    rmSync(project, { recursive: true, force: true })
    sinon.restore()
  })

  it('should create files successfully for default values: ci, no game & example name', () => {
    init(baseOptions)

    expect(existsSync(join(project, 'example.wlk'))).to.be.true
    expect(existsSync(join(project, 'testExample.wtest'))).to.be.true
    expect(existsSync(join(project, 'package.json'))).to.be.true
    expect(existsSync(join(project, GITHUB_FOLDER, 'ci.yml'))).to.be.true
    expect(existsSync(join(project, 'mainExample.wpgm'))).to.be.false
  })

  it('should create files successfully for game project with ci & custom example name', () => {
    init({
      ...baseOptions,
      game: true,
      name: 'pepita',
    })

    expect(existsSync(join(project, 'pepita.wlk'))).to.be.true
    expect(existsSync(join(project, 'testPepita.wtest'))).to.be.true
    expect(existsSync(join(project, 'mainPepita.wpgm'))).to.be.true
    expect(existsSync(join(project, 'package.json'))).to.be.true
    expect(existsSync(join(project, GITHUB_FOLDER, 'ci.yml'))).to.be.true
    const packageJson = readFileSync(join(project, 'package.json'),  'utf8')
    const { resourceFolder } = JSON.parse(packageJson)
    expect(resourceFolder).to.be.equal('assets')
  })

  it('should create files successfully for game project with no ci & no test custom example name', async () => {
    init({
      ...baseOptions,
      noCI: true,
      noTest: true,
      name: 'pepita',
    })

    expect(existsSync(join(project, 'pepita.wlk'))).to.be.true
    expect(existsSync(join(project, 'testPepita.wtest'))).to.be.false
    expect(existsSync(join(project, 'package.json'))).to.be.true
    expect(existsSync(join(project, 'mainPepita.wpgm'))).to.be.false
    expect(existsSync(join(project, GITHUB_FOLDER, 'ci.yml'))).to.be.false
  })

  it('should exit with code 1 if folder already exists', () => {
    init({
      ...baseOptions,
      project: join('examples', 'init-examples', 'existing-folder'),
    })

    expect(processExitSpy.calledWith(1)).to.be.true
  })


})