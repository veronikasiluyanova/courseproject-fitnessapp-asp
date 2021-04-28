#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["courseproject-fitnessapp-asp/courseproject-fitnessapp-asp.csproj", "courseproject-fitnessapp-asp/"]
COPY ["courseproject-fitnessapp-asp-common/courseproject-fitnessapp-asp-common.csproj", "courseproject-fitnessapp-asp-common/"]
RUN dotnet restore "courseproject-fitnessapp-asp/courseproject-fitnessapp-asp.csproj"
COPY . .
WORKDIR "/src/courseproject-fitnessapp-asp"
RUN dotnet build "courseproject-fitnessapp-asp.csproj" -c Release -o /app/build

FROM build AS publish
RUN apt-get install curl gnupg -yq \
    && curl -sL http://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -yq
RUN dotnet publish "courseproject-fitnessapp-asp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "courseproject-fitnessapp-asp.dll"]