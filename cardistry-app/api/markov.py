import random

class Markov(object):

    def __init__ (self):
        self.recommendedSeq = []

    # get a list of probabilities of transition from the current move to any other move
    def getTransitionProbs(self, moveBank, currentMove, seqDifficulty, difficultyMatchWeight, smoothTransitionWeight):
        smoothTransitionWeight = 2 * smoothTransitionWeight
        typeVariationWeight = 0.5 # 0 to 1

        startHandPos = currentMove["ending_position"]

        transitionProbs = []
        for move in moveBank:
            score = 0
            # try to have scores match start and end positions
            if move["starting_position"] == startHandPos:
                score += smoothTransitionWeight
            # try to have scores match difficulty target
            if (len(move["difficulty"]) > 0):
                score += difficultyMatchWeight * (5 - abs(int(move["difficulty"]) - seqDifficulty))
            # punish shuffles
            if move["moveType"] == "6": # shuffles id
                score = 0.4 * score
            # punish moves of the same type
            if move["moveType"] == currentMove["moveType"]:
                score = typeVariationWeight * score

            transitionProbs += [score]

        # has to sum to 1
        if sum(transitionProbs) == 0:
            transitionProbs = [1 / len(transitionProbs)] * len(transitionProbs)
        else:
            for i in range(len(transitionProbs)):
                transitionProbs[i] = transitionProbs[i] / sum(transitionProbs)
            
        return transitionProbs

    # returns the next move index given the probabilities of transitioning to any other move
    def transition(self, transitionProbs):
        randFloat = random.random()
        sumSoFar = 0
        i = 0
        while randFloat > sumSoFar:
            sumSoFar += transitionProbs[i]
            i += 1

        return max(i - 1, 0)

    # uses a Markov chain to generate a sequence of moves
    def createRecommendSeq(self, seqLength, seqDifficulty, difficultyMatchWeight, smoothTransitionWeight, moveBank):
        startingMoveIndex = random.randint(0, len(moveBank) - 1)
        currentMove = moveBank.pop(startingMoveIndex)

        # generate the sequence of moves
        seq = [currentMove]
        while (len(seq) < seqLength):
            transitionProbs = self.getTransitionProbs(moveBank, currentMove, seqDifficulty, difficultyMatchWeight, smoothTransitionWeight)
            nextMoveIndex = self.transition(transitionProbs)
            seq += [moveBank.pop(nextMoveIndex)]

        self.recommendedSeq = seq
        return seq