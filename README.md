
# Projet Spring Boot Microservices

Ce projet est une application basée sur une architecture de microservices utilisant Spring Boot.

## Services

Le projet comprend les microservices suivants :

1. Account Service
2. Customer Service
3. Discovery Service
4. Gateway Service

## Technologies utilisées

- Java
- Spring Boot
- Spring Cloud (pour la découverte de services et le gateway)
- Maven

## Structure du projet

```
Bank-account-app/
│
├── account-service/
│
├── discovery-service/
│
├── gateway-service/
│
├── customer-service/
│
└── config-service/

```

## Installation et exécution

1. Clonez ce dépôt
2. Naviguez dans chaque dossier de service et exécutez :
   ```
   ./mvnw spring-boot:run
   ```

## Fonctionnalités

- Le service client (customer-service) gère les clients
- Le service de compte (account-service) gère les comptes bancaires
- Le service de découverte (discovery-service) permet l'enregistrement et la découverte des microservices
- Le service de passerelle (gateway-service) agit comme point d'entrée pour les requêtes client

## Contribution

Les contributions à ce projet sont les bienvenues. Veuillez ouvrir une issue pour discuter des changements que vous souhaitez apporter.

## Licence

Ce projet est licencié sous la licence MIT. Veuillez consulter le fichier `LICENSE` pour plus de details.

