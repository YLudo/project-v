import { ContentLayoutProps } from "@/types";
import Navbar from "./navbar";

export function ContentLayout({ title, children }: ContentLayoutProps) {
    return (
        <div>
            <Navbar title={title} />
            <div className="py-8 px-4 sm:px-8">
                {children}
            </div>
        </div>
    )
}