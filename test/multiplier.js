const path = require("path");
const chai = require("chai");

const wasm_tester = require("circom_tester").wasm;

describe("Multiplier2 test", function () {
    this.timeout(100000);

    let cir;
    before(async () => {
		cir = await wasm_tester(path.join(__dirname, "..", "circuits", "template-circom-gadget.circom"));
		await cir.loadConstraints();
		console.log("n_constraints", cir.constraints.length);
    });

    it ("Multiply 2*3", async () => {
		const a = 2;
		const b = 3;
		const expectedOut = 6;

		const witness = await cir.calculateWitness({ a, b });
		await cir.checkConstraints(witness);
    });
});