import { useState, useMemo, useCallback } from "react"
import { PieChart, Pie, Cell, Sector } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { AnimatedCounter } from "@/components/animations/AnimatedFramerMotion/AnimatedCounter"

export function ChartPieInteractive({ value = 0, size, data: externalData, config: externalConfig, onClick }) {
  const [selected, setSelected] = useState(null)

  const chartData = useMemo(() => {
    if (externalData) return externalData
    return [
      { name: "Completed", value, fill: "var(--color-Completed)" },
      { name: "Remaining", value: 100 - value, fill: "var(--color-Remaining)" },
    ]
  }, [externalData, value])

  const chartConfig = useMemo(() => {
    if (externalConfig) return externalConfig
    return {
      Completed: { color: "hsl(var(--chart-3))" },
      Remaining: { color: "hsl(var(--chart-2))" },
    }
  }, [externalConfig])

  const total = useMemo(() => chartData.reduce((sum, d) => sum + d.value, 0), [chartData])
  const displayValue = externalData ? total : value

  const activeIndex = useMemo(
    () => (selected ? chartData.findIndex((item) => item.name === selected) : null),
    [selected, chartData]
  )

  const handleClick = useCallback((_, index) => {
    const name = chartData[index]?.name
    setSelected((prev) => (prev === name ? null : name))
    if (onClick) onClick(_, index)
  }, [chartData, onClick])

  const renderActiveShape = useCallback((props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
    return (
      <g>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 7} startAngle={startAngle} endAngle={endAngle} fill={fill} />
        <Sector cx={cx} cy={cy} innerRadius={outerRadius + 8} outerRadius={outerRadius + 18} startAngle={startAngle} endAngle={endAngle} fill={fill} opacity={0.2} />
      </g>
    )
  }, [])

  return (
    <div className="relative flex flex-col items-center gap-5">
      <div className="relative flex items-center justify-center" style={size ? { width: size, height: size } : { minWidth: 170, minHeight: 170, width: "100%", maxWidth: 260 }}>
        <ChartContainer config={chartConfig} className="aspect-square w-full h-full">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%" cy="50%"
              innerRadius={size ? size * 0.28 : "42%"}
              outerRadius={size ? size * 0.45 : "62%"}
              startAngle={90} endAngle={-270}
              dataKey="value" nameKey="name"
              stroke="var(--surface)" strokeWidth={3}
              activeIndex={activeIndex !== null ? activeIndex : undefined}
              activeShape={renderActiveShape}
              onClick={handleClick}
              className="cursor-pointer"
              animationBegin={0} animationDuration={1000} animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.fill || entry.color}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold tabular-nums text-text">
            <AnimatedCounter value={displayValue} duration={1.5} />
          </span>
          {!externalData && <span className="text-xs text-text-muted mt-0.5">%</span>}
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs w-full max-w-[260px]">
          {chartData.map((entry, index) => {
            const isActive = activeIndex === null || activeIndex === index
            return (
              <div
                key={entry.name}
                className="flex items-center gap-1.5 transition-all duration-200"
                style={{ opacity: isActive ? 1 : 0.3 }}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: entry.fill || entry.color }} />
                <span className="text-text-secondary">{entry.name}</span>
                <span className="font-semibold tabular-nums text-text">
                  <AnimatedCounter value={entry.value} duration={1.2} />
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
