#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./src"), exports);
const package_json_1 = __importDefault(require("./package.json"));
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const enquirer_1 = require("enquirer");
const src_1 = require("./src");
function font() {
    console.log(chalk_1.default.bold.hex("#3f8dce")(figlet_1.default.textSync('bla-bla', { font: "Bloody" })));
    console.log(chalk_1.default.hex("#fffa00")('⚡️'), chalk_1.default.hex("#3f8dce")('author  : '), chalk_1.default.hex("fffa00")(package_json_1.default.author));
    console.log(chalk_1.default.hex("#fffa00")('⚡️'), chalk_1.default.hex("#3f8dce")('version : '), chalk_1.default.hex("fffa00")(package_json_1.default.version));
}
function response(commande) {
    return __awaiter(this, void 0, void 0, function* () {
        if (commande === "welcome") {
            console.log(chalk_1.default.hex("#fffa00")("WELCOME !! "));
        }
        else if (commande === "help")
            console.log(chalk_1.default.hex("#fffa00")("> "), "Ask to", chalk_1.default.hex("#13aa52")("Tina Andriamarosoa"), "!!");
        else if (commande === "save as Processor") {
            (0, src_1.register)();
            console.log(chalk_1.default.hex("#fffa00")("> "), "Project", chalk_1.default.hex("#13aa52")("added successFully"), "!!");
        }
        else if (commande == "quit") { }
        else if (commande == "all") {
            console.log(chalk_1.default.hex("#fffa00")("success"), "!!");
            return (0, src_1.process)(null).then().catch(console.log);
        }
        else if (commande == "remove Processor") {
            let project = (0, src_1.projectName)();
            if (project.length == 0)
                console.log(chalk_1.default.hex("#13aa52")("there is no Project"), "!!");
            else {
                let value = yield (0, enquirer_1.prompt)({
                    type: "autocomplete",
                    name: "project",
                    message: "select one to remove",
                    choices: project,
                });
                console.clear();
                font();
                (0, src_1.removeProject)(value.project);
                console.log("\n", chalk_1.default.hex("#fffa00")("> "), value.project, chalk_1.default.hex("#13aa52")("deleted successFully"), "!!");
            }
        }
        else {
            (0, src_1.process)(commande).then().catch(console.log);
            console.log(chalk_1.default.hex("#13aa52")("> "), commande, chalk_1.default.hex("#fffa00")("successFully"), "!!");
        }
    });
}
function run(value) {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        font();
        console.log("\n");
        yield response(value.commande);
        console.log("\n");
        var commande = new Array();
        let callback = (0, src_1.getDecorator)(...(0, src_1.getProject)());
        for (let c of callback)
            c.getName() != "processor" && c.getName() != "use" && !commande.includes(c.getName()) && commande.push(c.getName());
        commande.push("save as Processor", "remove Processor", "help", "quit");
        value.commande != "quit" && (0, enquirer_1.prompt)({
            type: 'autocomplete',
            choices: commande,
            message: 'Enter a commande?',
            name: "commande",
            initial: (value === null || value === void 0 ? void 0 : value.commande) || 0
        }).then((v) => __awaiter(this, void 0, void 0, function* () { return yield run(v); }));
    });
}
run({ commande: "welcome" }).then();
//# sourceMappingURL=index.js.map