exports.run = (client, message, args) => {
    console.log('Error will happen');
    somerhing();
    console.log('Ups... ohh... got error', 10 / 0);
}