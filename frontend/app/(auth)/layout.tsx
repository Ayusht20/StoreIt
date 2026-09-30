import React from "react";
import Image from "next/image";
import logo from "../images/logo.png";
import folder from "../images/folder.png";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
        <section className="bg-brand p-10">
            <div>
<Image src={logo} alt="logo" width={224} height={82} className="h-auto"/> 
<div className="space-y-5 text-white">
    <h1 className="h1">Manage your files the best way</h1>
    <p className="body-1">
        This is a place where you can store all your documents.
    </p>

</div>
<Image src={folder} alt="Files" width={342} height={342} className="h-auto"/> 

            </div>
        </section>
      {children}
    </div>
  );
};

export default Layout;