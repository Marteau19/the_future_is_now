import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function addDays(date, n) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

function formatDate(d) {
  return d.toISOString().split('T')[0]
}

function isWeekday(d) {
  const day = d.getDay()
  return day !== 0 && day !== 6
}

function buildAvailableDays(startDate, weeksAhead = 3) {
  const days = []
  let d = addDays(startDate, 1)
  const end = addDays(startDate, weeksAhead * 7)
  while (d <= end) {
    if (isWeekday(d)) days.push(new Date(d))
    d = addDays(d, 1)
  }
  return days
}

const SLOTS = ['9:00 AM', '1:00 PM']

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAY_NAMES = ['Su','Mo','Tu','We','Th','Fr','Sa']

export default function BookingCalendar({ onSelect }) {
  const today = new Date('2026-03-27')
  const available = buildAvailableDays(today)
  const availSet = new Set(available.map(formatDate))

  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  // Build calendar grid
  const firstOfMonth = new Date(viewYear, viewMonth, 1)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const startDow = firstOfMonth.getDay()
  const cells = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d))

  function handleDateClick(d) {
    const key = formatDate(d)
    if (!availSet.has(key)) return
    setSelectedDate(key)
    setSelectedSlot(null)
  }

  function handleSlotClick(slot) {
    setSelectedSlot(slot)
    if (selectedDate && onSelect) onSelect({ date: selectedDate, slot })
  }

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronLeft size={18} />
        </button>
        <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-xs font-medium py-1" style={{ color: 'var(--color-text-disabled)' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />
          const key = formatDate(d)
          const avail = availSet.has(key)
          const sel = selectedDate === key
          return (
            <button
              key={key}
              onClick={() => handleDateClick(d)}
              disabled={!avail}
              className="mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors"
              style={{
                background: sel ? 'var(--color-brand)' : 'transparent',
                color: sel ? '#fff' : avail ? 'var(--color-text)' : 'var(--color-text-disabled)',
                cursor: avail ? 'pointer' : 'default',
              }}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="mt-4">
          <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
            Available times
          </p>
          <div className="flex gap-3">
            {SLOTS.map(slot => {
              const active = selectedSlot === slot
              return (
                <button
                  key={slot}
                  onClick={() => handleSlotClick(slot)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors"
                  style={{
                    background: active ? 'var(--color-brand)' : 'var(--color-surface)',
                    color: active ? '#fff' : 'var(--color-text)',
                    borderColor: active ? 'var(--color-brand)' : 'var(--color-border)',
                  }}
                >
                  {slot}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
