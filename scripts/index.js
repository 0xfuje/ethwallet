const greet = async () => {
    const rinkeby = '0x1981883949533091ea44aBd3135618A69134457B';
    const Greeter = await ethers.getContractFactory('Greeter');
    const greeter = await Greeter.attach(rinkeby);
    const greet = await greeter.greet();
    console.log(greet);
}

const setGreeting = async (newGreet) => {
    const rinkeby = '0x1981883949533091ea44aBd3135618A69134457B';
    const Greeter = await ethers.getContractFactory('Greeter');
    const greeter = await Greeter.attach(rinkeby);
    await greeter.setGreeting(newGreet);
}

async function main () {
    await greet();
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });