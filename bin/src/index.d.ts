#!/usr/bin/env node
import { Project } from "ts-morph";
export declare const projectInRuntime: Project;
export declare function process(commande: string | null): Promise<void>;
export * from "./register";
export * from "./callback";
export * from "./processor";
export * from "./decorator";
