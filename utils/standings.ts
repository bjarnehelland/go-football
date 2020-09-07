import * as R from 'ramda'

function initializeTeam(team) {
  return {
    team,
    gp: 0,
    w: 0,
    d: 0,
    l: 0,
    gf: 0,
    ga: 0,
    gd: 0,
    fpp: 0,
    pts: 0,
    position: 0,
  }
}

function generateTable(matches) {
  const teams = {}

  for (const match of matches) {
    const homeTeam = teams[match.homeTeam] ?? (teams[match.homeTeam] = initializeTeam(match.homeTeam))
    const awayTeam = teams[match.awayTeam] ?? (teams[match.awayTeam] = initializeTeam(match.awayTeam))

    homeTeam.gp += 1
    homeTeam.gf += match.homeTeamGoals
    homeTeam.ga += match.awayTeamGoals
    homeTeam.gd = homeTeam.gf - homeTeam.ga
    homeTeam.fpp += match.homeTeamFPP

    awayTeam.gp += 1
    awayTeam.gf += match.awayTeamGoals
    awayTeam.ga += match.homeTeamGoals
    awayTeam.gd = awayTeam.gf - awayTeam.ga
    awayTeam.fpp += match.awayTeamFPP

    if (match.homeTeamGoals > match.awayTeamGoals) {
      homeTeam.pts += 3

      homeTeam.w += 1
      awayTeam.l += 1
    } else if (match.homeTeamGoals < match.awayTeamGoals) {
      awayTeam.pts += 3

      homeTeam.l += 1
      awayTeam.w += 1
    } else {
      homeTeam.pts += 1
      awayTeam.pts += 1

      homeTeam.d += 1
      awayTeam.d += 1
    }
  }

  return Object.values(teams)
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

function filterMatches(matches) {
  return function (teams) {
    return matches.filter((match) => teams.includes(match.homeTeam) && teams.includes(match.awayTeam))
  }
}

const tiebbreakRuleFn = R.curry(function (matches, rules, table) {
  const group = table.filter((item) => !item.finalPosition)
  if (!group.length) return table

  const groupRules = rules
    .map((item) => {
      switch (item.rule) {
        case 'sort':
          return sort(item.prop, item.direction)
      }
    })
    .reverse()

  let tiebreakTable = R.compose(generateTable, filterMatches(matches), R.map(R.prop('team')))(group)
  tiebreakTable = R.compose(sortByPosition, ...groupRules)(tiebreakTable)

  const positions = tiebreakTable.reduce((acc, item) => {
    if (item.finalPosition) {
      acc[item.team] = item.position
    }
    return acc
  }, {})

  return table.map((item) => {
    if (positions[item.team] !== undefined) {
      return { ...item, position: item.position + positions[item.team], finalPosition: true }
    }
    return item
  })
})

function updatePositions(groups) {
  let teamIndex = 0
  return groups.reduce((acc, group, groupIndex) => {
    acc = [
      ...acc,
      ...group.map((item) => {
        if (!item.finalPosition) {
          const isFinalPosition = group.filter((item) => !item.finalPosition).length === 1
          const newItem = {
            ...item,
            position: isFinalPosition ? teamIndex : groupIndex,
            finalPosition: isFinalPosition,
          }

          teamIndex++
          return newItem
        }
        return item
      }),
    ]

    return acc
  }, [])
}
const keyCombiner = R.curry(function compine(props, o) {
  return props.reduce((key, prop) => {
    key += o[prop]
    return key
  }, '')
})

const sort = R.curry(function (prop, direction, table) {
  if (table.every((item) => item.finalPosition)) return table
  prop = Array.isArray(prop) ? prop : [prop]
  let sortProps = prop.map((prop) => (direction === 'ascend' ? R.ascend(R.prop(prop)) : R.descend(R.prop(prop))))
  //sortProps = [R.ascend(R.prop('position')), ...sortProps]
  const groupProps = keyCombiner([...prop])
  const groups = R.compose(
    updatePositions,
    R.groupWith((a, b) => groupProps(a) === groupProps(b)),
    R.sortWith(sortProps),
  )(table)

  return groups
})

function drawingOfLots(table) {
  return R.compose(
    R.map((item) => {
      if (!item.position) item.position = 0
      return item
    }),
  )(table)

  // const teams = table.filter((item) => item.position !== undefined)

  // return updatePositions(table, [])
}

const sortByPosition = R.sortWith([R.ascend(R.prop('position'))])

export function standings(matches, rules = []) {
  const initialTable = generateTable(matches)

  const tiebreak = tiebbreakRuleFn(matches)

  return R.pipe(
    ...rules
      .map((item) => {
        switch (item.rule) {
          case 'sort':
            return sort(item.prop, item.direction)
          case 'tiebreak':
            return tiebreak(item.children)
        }
      })
      .filter((item) => item),
    sortByPosition,
  )(initialTable)
}

function log(table) {
  console.log(table)
  return table
}

function logTable(table) {
  console.table(table)
  return table
}
