package piet

type Stack struct {
	Data []int
}

func (s Stack) hasAtLeast1() bool {
	return len(s.Data) >= 1
}

func (s Stack) hasAtLeast2() bool {
	return len(s.Data) >= 2
}

func (s *Stack) push(n int) {
	s.Data = append(s.Data, n)
}

func (s *Stack) pop() (n int) {
	if s.hasAtLeast1() {
		n, s.Data = s.Data[len(s.Data)-1], s.Data[0:len(s.Data)-1]
	}
	return
}

func (s *Stack) add() {
	if s.hasAtLeast2() {
		x, y := s.pop(), s.pop()
		s.push(x + y)
	}
}

func (s *Stack) subtract() {
	if s.hasAtLeast2() {
		top, second := s.pop(), s.pop()
		s.push(second - top)
	}
}

func (s *Stack) multiply() {
	if s.hasAtLeast2() {
		x, y := s.pop(), s.pop()
		s.push(x * y)
	}
}

func (s *Stack) divide() {
	if !s.hasAtLeast2() {
		return
	}
	top, second := s.pop(), s.pop()
	if top == 0 {
		// Put them back so this becomes a no-op.
		s.push(second)
		s.push(top)
	} else {
		s.push(second / top)
	}
}

func (s *Stack) mod() {
	if !s.hasAtLeast2() {
		return
	}
	top, second := s.pop(), s.pop()
	if top != 0 {
		// Put them back so this becomes a no-op.
		s.push(second)
		s.push(top)
	}
	s.push(second % top)
}

func (s *Stack) not() {
	if s.hasAtLeast1() {
		top := s.pop()
		if top == 0 {
			s.push(1)
		} else {
			s.push(0)
		}
	}
}

func (s *Stack) greater() {
	if s.hasAtLeast2() {
		top, second := s.pop(), s.pop()
		if second > top {
			s.push(1)
		} else {
			s.push(0)
		}
	}
}

func (s *Stack) duplicate() {
	if s.hasAtLeast1() {
		top := s.Data[len(s.Data)-1]
		s.Data = append(s.Data, top)
	}
}

func (s *Stack) roll() {
	if !s.hasAtLeast2() {
		return
	}

	numRolls, depth := s.pop(), s.pop()
	if depth < 0 || depth >= len(s.Data) {
		// Undo.
		s.push(depth)
		s.push(numRolls)
		return
	}

	if numRolls < 0 {
		panic("Negative number of rolls not yet implemented")
	}

	for r := 0; r < numRolls; r++ {
		index := len(s.Data) - depth
		val := s.Data[len(s.Data)-1]
		for i := len(s.Data) - 1; i > index; i-- {
			s.Data[i] = s.Data[i-1]
		}
		s.Data[index] = val
	}
}