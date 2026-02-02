import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/(admin)/login/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="/admin/dashboard"
            className="flex items-center gap-2 font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            CREDIT 2.0
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="bg-primary/10 rounded-lg p-8 mb-4">
              <GalleryVerticalEnd className="size-16 mx-auto text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">管理画面</h2>
            <p className="text-muted-foreground">
              CREDIT 2.0の管理機能にアクセス
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
