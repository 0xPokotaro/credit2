export default function AdminDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
          <p className="text-muted-foreground">
            管理画面の概要と統計情報を確認できます
          </p>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">ようこそ、管理画面へ</h2>
          <p className="text-muted-foreground">
            ログインに成功しました。ここから管理機能にアクセスできます。
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-2">統計情報</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">総ユーザー数</p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-2">アクティビティ</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">今日のアクセス</p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-2">システム</h3>
            <p className="text-2xl font-bold">正常</p>
            <p className="text-sm text-muted-foreground">ステータス</p>
          </div>
        </div>
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}

