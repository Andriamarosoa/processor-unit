import { Project } from 'ts-morph';
export declare function getProject(): Array<Project>;
export declare function projectName(): string[];
export declare function saveProcessor(path: string): Project[];
export declare function removeProject(name: string): void;
export declare function register(): void;
