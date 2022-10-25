import type { Cluster } from '@solana/web3.js'
import { Connection } from '@solana/web3.js'
import React, { useContext, useEffect, useMemo, useState } from 'react'

export interface Environment {
  label: Cluster
  primary: string
  secondary?: string
}

export interface EnvironmentContextValues {
  environment: Environment
  setEnvironment: (newEnvironment: Environment) => void
  connection: Connection
  secondaryConnection: Connection
  customHostname: boolean
}

export const CLUSTER = 'mainnet-beta'

export const ENVIRONMENTS: Environment[] = [
  {
    label: 'mainnet-beta',
    primary:
      process.env.MAINNET_PRIMARY || 'https://solana-api.projectserum.com',
    secondary:
      process.env.MAINNET_SECONDARY || 'https://solana-api.projectserum.com',
  },
  {
    label: 'testnet',
    primary: 'https://api.testnet.solana.com',
  },
  {
    label: 'devnet',
    primary: 'https://api.devnet.solana.com',
  },
]

const EnvironmentContext: React.Context<null | EnvironmentContextValues> =
  React.createContext<null | EnvironmentContextValues>(null)

export function EnvironmentProvider({
  children,
  defaultCluster,
}: {
  children: React.ReactChild
  defaultCluster: string
}) {
  const cluster = defaultCluster
  const foundEnvironment = ENVIRONMENTS.find((e) => e.label === cluster)
  const [environment, setEnvironment] = useState<Environment>(
    foundEnvironment ?? ENVIRONMENTS[0]!
  )
  const [customHostname, setCustomHostname] = useState<boolean>(false)

  useMemo(() => {
    const foundEnvironment = ENVIRONMENTS.find((e) => e.label === cluster)
    setEnvironment(foundEnvironment ?? ENVIRONMENTS[0]!)
  }, [cluster])

  const connection = useMemo(
    () => new Connection(environment.primary, { commitment: 'recent' }),
    [environment]
  )

  const secondaryConnection = useMemo(
    () =>
      new Connection(environment.secondary ?? environment.primary, {
        commitment: 'recent',
      }),
    [environment]
  )

  useEffect(() => {
    setCustomHostname(
      window &&
        !(
          window.location.hostname.includes('cardinal') ||
          window.location.hostname.includes('localhost')
        )
    )
  }, [])

  return (
    <EnvironmentContext.Provider
      value={{
        environment,
        setEnvironment,
        connection,
        secondaryConnection,
        customHostname,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  )
}

export function useEnvironmentCtx(): EnvironmentContextValues {
  const context = useContext(EnvironmentContext)
  if (!context) {
    throw new Error('Missing connection context')
  }
  return context
}
