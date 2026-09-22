import { cn } from "@/lib/utils";

type MockupProps = {
  className?: string;
};

function BrowserChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/10 bg-brand-dark px-3 py-2">
      <div className="flex gap-1" aria-hidden="true">
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
      </div>
      <span className="ml-2 truncate text-[10px] font-medium text-white/60">
        {title}
      </span>
    </div>
  );
}

function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.25rem] border border-white/20 bg-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.45)]",
        className,
      )}
    >
      <div className="flex items-center justify-center bg-brand-dark py-1.5">
        <div className="h-1 w-8 rounded-full bg-white/25" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}

export function WorkforceMockup({ className }: MockupProps) {
  const workers = [
    { name: "Ramesh Kumar", role: "Mason", project: "Riverside Towers", status: "Active" },
    { name: "Suresh Yadav", role: "Helper", project: "Greenview Residences", status: "Active" },
    { name: "Imran Sheikh", role: "Bar Bender", project: "Riverside Towers", status: "On leave" },
  ];

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden rounded-lg border border-white/15 bg-white shadow-[0_28px_70px_-30px_rgba(15,23,42,0.5)]">
        <BrowserChrome title="greenwave.app/workforce" />
        <div className="flex min-h-[220px]">
          <div className="hidden w-16 shrink-0 bg-brand-dark p-2 sm:block" aria-hidden="true">
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-2 rounded bg-white/15" />
              ))}
            </div>
          </div>
          <div className="flex-1 p-3 sm:p-4">
            <p className="text-xs font-semibold text-brand">Workforce</p>
            <div className="mt-3 space-y-2">
              {workers.map((worker) => (
                <div
                  key={worker.name}
                  className="flex items-center gap-2 rounded-md border border-border/80 bg-surface px-2 py-1.5"
                >
                  <div className="size-6 shrink-0 rounded-full bg-brand-light" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-semibold text-foreground">
                      {worker.name}
                    </p>
                    <p className="truncate text-[9px] text-muted">{worker.role}</p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-semibold",
                      worker.status === "Active"
                        ? "bg-accent-light text-accent"
                        : "bg-surface text-muted",
                    )}
                  >
                    {worker.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PhoneFrame className="absolute -bottom-4 -right-2 w-[38%] sm:-right-4 sm:w-[34%]">
        <div className="space-y-2 p-2.5">
          <p className="text-[9px] font-semibold text-brand">My Projects</p>
          <div className="grid grid-cols-2 gap-1.5">
            {["Profile", "Assignment", "Attendance", "Documents"].map((item) => (
              <div
                key={item}
                className="rounded-md bg-brand-light px-1 py-2 text-center text-[7px] font-medium text-brand"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

export function AttendanceMockup({ className }: MockupProps) {
  return (
    <div className={cn("flex justify-center gap-3 sm:gap-4", className)}>
      <PhoneFrame className="w-[46%] max-w-[160px]">
        <div className="space-y-2.5 p-3">
          <p className="text-[10px] font-semibold text-brand">Mark attendance</p>
          <div className="rounded-md bg-accent-light px-2 py-1.5 text-[8px] font-medium text-accent">
            You are at the project site
          </div>
          <div className="mx-auto flex size-16 items-center justify-center rounded-lg border-2 border-dashed border-accent/40 bg-surface">
            <div className="size-10 rounded-full bg-brand-light" />
          </div>
          <p className="text-center text-[8px] font-medium text-accent">Face verified</p>
          <div className="rounded-md bg-brand py-2 text-center text-[9px] font-semibold text-white">
            Check in
          </div>
        </div>
      </PhoneFrame>

      <PhoneFrame className="w-[46%] max-w-[160px]">
        <div className="space-y-2 p-3">
          <p className="text-[10px] font-semibold text-brand">September 2026</p>
          {[
            { day: "Fri, 19 Sep", time: "08:02 AM" },
            { day: "Thu, 18 Sep", time: "07:58 AM" },
            { day: "Wed, 17 Sep", time: "08:11 AM" },
          ].map((entry) => (
            <div
              key={entry.day}
              className="flex items-center justify-between rounded-md border border-border/70 px-2 py-1.5"
            >
              <div>
                <p className="text-[8px] font-medium text-foreground">{entry.day}</p>
                <p className="text-[7px] text-muted">{entry.time}</p>
              </div>
              <span className="rounded-full bg-accent-light px-1.5 py-0.5 text-[7px] font-semibold text-accent">
                Present
              </span>
            </div>
          ))}
        </div>
      </PhoneFrame>
    </div>
  );
}

export function DprMockup({ className }: MockupProps) {
  const cards = [
    { label: "Manpower", value: "42", note: "+6% vs yesterday" },
    { label: "Work completed", value: "3", note: "On track" },
    { label: "Materials", value: "12", note: "Items logged" },
    { label: "Equipment", value: "5", note: "Machines active" },
  ];

  return (
    <div className={cn("overflow-hidden rounded-lg border border-white/15 bg-white shadow-[0_28px_70px_-30px_rgba(15,23,42,0.5)]", className)}>
      <BrowserChrome title="greenwave.app/dpr" />
      <div className="p-3 sm:p-4">
        <p className="text-xs font-semibold text-brand">Daily progress report</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-md border border-border/70 bg-surface px-2.5 py-2"
            >
              <p className="text-[8px] font-medium text-muted">{card.label}</p>
              <p className="mt-0.5 text-lg font-bold tabular-nums text-foreground">
                {card.value}
              </p>
              <p className="text-[7px] text-accent">{card.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          {["Concrete work completed for Block A", "No safety issues observed"].map(
            (note) => (
              <div
                key={note}
                className="rounded-md border border-border/60 px-2 py-1.5 text-[8px] text-muted"
              >
                {note}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export function PayrollMockup({ className }: MockupProps) {
  const summary = [
    { label: "Workers", value: "248" },
    { label: "Wages", value: "₹12.4L" },
    { label: "Overtime", value: "₹1.85L" },
    { label: "Payout", value: "₹14.25L" },
  ];

  const rows = [
    { name: "Ramesh Kumar", role: "Mason", amount: "₹18,500" },
    { name: "Suresh Yadav", role: "Helper", amount: "₹14,200" },
    { name: "Imran Sheikh", role: "Bar Bender", amount: "₹21,800" },
  ];

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden rounded-lg border border-white/15 bg-white shadow-[0_28px_70px_-30px_rgba(15,23,42,0.5)]">
        <BrowserChrome title="greenwave.app/salary" />
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-brand">Salary sheet</p>
            <span className="rounded-md bg-brand-light px-2 py-0.5 text-[8px] font-medium text-brand">
              October 2026
            </span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {summary.map((item) => (
              <div
                key={item.label}
                className="rounded-md bg-surface px-1.5 py-1.5 text-center"
              >
                <p className="text-[7px] text-muted">{item.label}</p>
                <p className="text-[9px] font-bold tabular-nums text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            {rows.map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between rounded-md border border-border/70 px-2 py-1.5"
              >
                <div>
                  <p className="text-[9px] font-semibold text-foreground">{row.name}</p>
                  <p className="text-[7px] text-muted">{row.role}</p>
                </div>
                <p className="text-[9px] font-bold tabular-nums text-brand">{row.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PhoneFrame className="absolute -bottom-3 -right-2 w-[36%] sm:-right-3 sm:w-[32%]">
        <div className="p-2.5">
          <p className="text-[8px] font-semibold text-brand">My salary</p>
          <p className="mt-1 text-lg font-bold tabular-nums text-foreground">₹18,500</p>
          <div className="mt-2 space-y-1 text-[7px] text-muted">
            <div className="flex justify-between">
              <span>Basic wages</span>
              <span>₹15,600</span>
            </div>
            <div className="flex justify-between">
              <span>Overtime</span>
              <span>₹2,400</span>
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

export function AnalyticsMockup({ className }: MockupProps) {
  const kpis = [
    { label: "Projects", value: "12" },
    { label: "Workforce", value: "1,284" },
    { label: "Attendance", value: "92%" },
    { label: "Progress", value: "68%" },
  ];

  const bars = [72, 58, 84, 46, 91];

  return (
    <div className={cn("overflow-hidden rounded-lg border border-white/15 bg-white shadow-[0_28px_70px_-30px_rgba(15,23,42,0.5)]", className)}>
      <BrowserChrome title="greenwave.app/analytics" />
      <div className="p-3 sm:p-4">
        <p className="text-xs font-semibold text-brand">Project overview</p>
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-md bg-surface px-1.5 py-1.5 text-center"
            >
              <p className="text-[7px] text-muted">{kpi.label}</p>
              <p className="text-[10px] font-bold tabular-nums text-foreground">
                {kpi.value}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
          <div>
            <p className="text-[8px] font-medium text-muted">Project progress</p>
            <div className="mt-2 flex items-end gap-1.5" style={{ height: 56 }}>
              {bars.map((height, index) => (
                <div
                  key={index}
                  className="w-4 rounded-t bg-accent/80"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[8px] font-medium text-muted">Cost split</p>
            <div
              className="mt-2 size-14 rounded-full"
              style={{
                background:
                  "conic-gradient(var(--accent) 0% 42%, var(--brand) 42% 70%, #94a3b8 70% 88%, #e2e8f0 88% 100%)",
              }}
              aria-hidden="true"
            />
            <p className="mt-1 text-[8px] font-bold tabular-nums text-brand">₹2.4 Cr</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const mockupMap = {
  workforce: WorkforceMockup,
  attendance: AttendanceMockup,
  dpr: DprMockup,
  payroll: PayrollMockup,
  analytics: AnalyticsMockup,
} as const;

export function TechMockup({ moduleId }: { moduleId: keyof typeof mockupMap }) {
  const Mockup = mockupMap[moduleId];
  return <Mockup />;
}
