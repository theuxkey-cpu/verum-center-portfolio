"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AccountAlert } from "@/components/ui/account-alert"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { FormField } from "@/components/ui/form-field"
import { SCENARIOS } from "@/lib/scenarios"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-border bg-card p-6">{children}</div>
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>
}

export default function CenariosPage() {
  const [modal, setModal] = useState<keyof typeof SCENARIOS.modal | null>(null)

  return (
    <div className="mx-auto max-w-[760px] px-6">
      <nav className="border-b border-border py-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground"
        >
          ← Back
        </Link>
      </nav>

      <header className="mb-[72px] border-b border-border pb-14 pt-12">
        <p className="mb-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-muted-foreground before:block before:h-px before:w-5 before:bg-muted-foreground">
          Interactive Demo · Verum Sales Global
        </p>
        <h1 className="mb-5 text-[clamp(28px,5vw,44px)] font-semibold leading-[1.15] tracking-[-0.02em]">
          UI Scenarios — Accounts Module
        </h1>
        <p className="max-w-[560px] text-[17px] leading-[1.6] text-muted-foreground">
          Every UI state in the Accounts module, live. Generated with the Scenario Generator tool, implemented in production with the VSG design system. Click any button to trigger the interaction.
        </p>
      </header>

      <div className="flex flex-col gap-10 pb-24">

        <Section title="Toast · Success">
          <Card>
            <Row>
              {(["contaCadastrada", "beneficioFiscalAdicionado", "contatoAdicionado", "anexoEnviado"] as const).map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  onClick={() => toast.success(SCENARIOS.toast[key].title, { description: SCENARIOS.toast[key].description })}
                >
                  {SCENARIOS.toast[key].title}
                </Button>
              ))}
            </Row>
          </Card>
        </Section>

        <Section title="Toast · Error">
          <Card>
            <Row>
              {(["erroCpfCnpjJaCadastrado", "erroSalvarConta", "erroEnviarSap", "erroAnexarArquivo"] as const).map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  onClick={() => toast.error(SCENARIOS.toast[key].title, { description: SCENARIOS.toast[key].description })}
                >
                  {SCENARIOS.toast[key].title}
                </Button>
              ))}
            </Row>
          </Card>
        </Section>

        <Section title="Alert · Info / Warning / Error">
          <div className="flex flex-col gap-3">
            {(["contaAguardandoValidacao", "integracaoSapFalhou", "beneficioFiscalExpirado", "contaRejeitadaSap"] as const).map((key) => (
              <AccountAlert key={key} {...SCENARIOS.alert[key]} />
            ))}
          </div>
        </Section>

        <Section title="Tooltip · Info">
          <Card>
            <div className="grid grid-cols-2 gap-4">
              {(["clienteInternacional", "tipoRelacao", "grupoEconomico", "beneficioFiscal", "contatoPrincipal", "multiplasIEs"] as const).map((key) => (
                <FormField
                  key={key}
                  label={SCENARIOS.tooltip[key].title}
                  labelSuffix={<InfoTooltip {...SCENARIOS.tooltip[key]} />}
                >
                  <Input placeholder="Example field" disabled />
                </FormField>
              ))}
            </div>
          </Card>
        </Section>

        <Section title="Modal · Confirmation / Info">
          <Card>
            <Row>
              {(["cancelarCadastro", "removerContato", "removerIE", "selecionarEnderecoNF"] as const).map((key) => (
                <Button key={key} variant="outline" onClick={() => setModal(key)}>
                  {SCENARIOS.modal[key].title}
                </Button>
              ))}
            </Row>
          </Card>
          {modal && (
            <ConfirmDialog
              open={!!modal}
              onOpenChange={(open) => !open && setModal(null)}
              title={SCENARIOS.modal[modal].title}
              description={SCENARIOS.modal[modal].description}
              variant={SCENARIOS.modal[modal].variant}
              confirmLabel={SCENARIOS.modal[modal].confirmLabel}
              onConfirm={() => setModal(null)}
            />
          )}
        </Section>

        <Section title="Inline Error">
          <Card>
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  "cpfCnpjInvalido",
                  "cpfCnpjDuplicado",
                  "cepInvalido",
                  "paisNaoSelecionado",
                  "grupoEconomicoSemMatriz",
                  "grupoEconomicoNaoEncontrado",
                  "anexoObrigatorioFaltando",
                  "contatoObrigatorioFaltando",
                ] as const
              ).map((key) => (
                <FormField key={key} label={SCENARIOS.inlineError[key]} error={SCENARIOS.inlineError[key]}>
                  <Input aria-invalid placeholder="Field with error" />
                </FormField>
              ))}
            </div>
          </Card>
        </Section>

      </div>
    </div>
  )
}
