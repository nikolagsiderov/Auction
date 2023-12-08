using Background;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.AddHostedService<OrderCollector>();
    })
    .Build();

await host.RunAsync();
