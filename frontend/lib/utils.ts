export { cn } from "cn"

export const parseStringfy=(value:unknown)=>
{
    return JSON.parse(JSON.stringify(value));
}