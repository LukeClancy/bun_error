import Bun from 'bun'

async function f() {
	console.log("This file is to demonstrate issues with sourcemap functionality in Bun.build")
	console.log("Current bun version: ", Bun.version)
	console.log('')
	console.log("Issue one - naming overide")
	await Bun.build({
		entrypoints: ['./in1/assetlink.js'],
		outdir: './out1',
		sourcemap: 'external', // <- error source
		naming: '[dir]/[name]-[hash].[ext]'
	})
	console.log("In the following file, the import's name is not hashed as was specified in Bun.build")
	console.log("____________________________________________________")
	await Bun.$`cat out1/assetlink*.js`
	console.log("___________________________________________________")
	console.log("Issue two - segfault on jpegs (only jpegs strangely)")
	console.log("we are about to segfault...")
	await Bun.build({
	        entrypoints: ['./in2/assetlink.js'],
	        outdir: './out2',
	        sourcemap: 'external', // <- error source
	        naming: '[dir]/[name]-[hash].[ext]'
	})
	console.log("never mind? I suppose the issue is OS dependant or something")
}
f()
