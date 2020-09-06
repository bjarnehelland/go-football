import { standings } from './standings'

describe('standings', () => {
  it.only('sort table', () => {
    const matches = [
      {
        homeTeam: 'team a',
        homeTeamGoals: 1,
        homeTeamFPP: -7,
        awayTeam: 'team b',
        awayTeamGoals: 5,
        awayTeamFPP: 0,
      },
      {
        homeTeam: 'team c',
        homeTeamGoals: 1,
        homeTeamFPP: -6,
        awayTeam: 'team d',
        awayTeamGoals: 1,
        awayTeamFPP: 0,
      },
      {
        homeTeam: 'team a',
        homeTeamGoals: 3,
        homeTeamFPP: 0,
        awayTeam: 'team c',
        awayTeamGoals: 0,
        awayTeamFPP: 0,
      },
      {
        homeTeam: 'team b',
        homeTeamGoals: 0,
        homeTeamFPP: -8,
        awayTeam: 'team d',
        awayTeamGoals: 0,
        awayTeamFPP: 0,
      },
      {
        homeTeam: 'team a',
        homeTeamGoals: 0,
        homeTeamFPP: 0,
        awayTeam: 'team d',
        awayTeamGoals: 0,
        awayTeamFPP: 0,
      },
      {
        homeTeam: 'team b',
        homeTeamGoals: 0,
        homeTeamFPP: 0,
        awayTeam: 'team c',
        awayTeamGoals: 3,
        awayTeamFPP: 0,
      },
    ]

    const rules = [
      {
        rule: 'sort',
        prop: 'pts',
        direction: 'descend',
      },
      {
        rule: 'sort',
        prop: 'gd',
        direction: 'descend',
      },
      {
        rule: 'sort',
        prop: 'gf',
        direction: 'descend',
      },
    ]

    const table = standings(matches, rules)

    console.table(table)
    expect(table[0].team).toEqual('team b')
    expect(table[1].team).toEqual('team c')
    expect(table[2].team).toEqual('team a')
    expect(table[3].team).toEqual('team d')
  })
  it('world cup group standing', () => {
    const matches = [
      {
        homeTeam: 'team a',
        homeTeamGoals: 1,
        homeTeamFPP: -7,
        awayTeam: 'team b',
        awayTeamGoals: 4,
        awayTeamFPP: 0,
      },
      {
        homeTeam: 'team c',
        homeTeamGoals: 1,
        homeTeamFPP: -6,
        awayTeam: 'team d',
        awayTeamGoals: 1,
        awayTeamFPP: 0,
      },
      {
        homeTeam: 'team a',
        homeTeamGoals: 3,
        homeTeamFPP: 0,
        awayTeam: 'team c',
        awayTeamGoals: 0,
        awayTeamFPP: 0,
      },
      {
        homeTeam: 'team b',
        homeTeamGoals: 0,
        homeTeamFPP: -8,
        awayTeam: 'team d',
        awayTeamGoals: 0,
        awayTeamFPP: 0,
      },
      {
        homeTeam: 'team a',
        homeTeamGoals: 0,
        homeTeamFPP: 0,
        awayTeam: 'team d',
        awayTeamGoals: 0,
        awayTeamFPP: 0,
      },
      {
        homeTeam: 'team b',
        homeTeamGoals: 0,
        homeTeamFPP: 0,
        awayTeam: 'team c',
        awayTeamGoals: 3,
        awayTeamFPP: 0,
      },
    ]

    const rules = [
      {
        rule: 'sort',
        prop: 'pts',
        direction: 'descend',
      },
      {
        rule: 'sort',
        prop: 'gd',
        direction: 'descend',
      },
      {
        rule: 'sort',
        prop: 'gf',
        direction: 'descend',
      },
      {
        rule: 'tiebreak',
        children: [
          {
            rule: 'sort',
            prop: 'pts',
            direction: 'descend',
          },
          {
            rule: 'sort',
            prop: 'gd',
            direction: 'descend',
          },
          {
            rule: 'sort',
            prop: 'gf',
            direction: 'descend',
          },
        ],
      },
      {
        rule: 'sort',
        prop: 'fpp',
        direction: 'descend',
      },
    ]

    const table = standings(matches, rules)

    //console.table(table)
    expect(table[0].team).toEqual('team a')
    expect(table[1].team).toEqual('team b')
    expect(table[2].team).toEqual('team c')
    expect(table[3].team).toEqual('team d')
  })
})
