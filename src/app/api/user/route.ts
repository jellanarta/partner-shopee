import { initDb } from "@/utils/user/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        await initDb()
        return NextResponse.json({ success: true, message: "Database initialized successfully" })
      } catch (error) {
        console.error("Error initializing database:", error)
        return NextResponse.json({ success: false, message: "Failed to initialize database" }, { status: 500 })
      }
}
export async function POST(request:NextRequest){
    try {
        
    } catch (error) {
        
    }
}
export async function PUT(){
    try {
        
    } catch (error) {
        
    }
}
export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
        }

        // Perform delete operation (e.g., delete user from database)
        // Example: await deleteUserById(id);

        return NextResponse.json({ success: true, message: `User with ID ${id} deleted successfully` });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ success: false, message: "Failed to delete user" }, { status: 500 });
    }
}